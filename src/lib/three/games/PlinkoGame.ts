import * as THREE from 'three';
import { SceneManager } from '../SceneManager';
import { PhysicsManager } from '../PhysicsManager';
import RAPIER from '@dimforge/rapier3d-compat';

export interface BallLandResult {
  multiplier: string;
  payout: number;
  slotIndex: number;
}

export class PlinkoGame {
  private manager: SceneManager;
  private physics: PhysicsManager;
  private pegs: THREE.Mesh[] = [];
  private staticBodies: RAPIER.RigidBody[] = [];
  private balls: THREE.Mesh[] = [];
  private currentRows: number = 8;

  // Callbacks
  public onBallLand?: (result: BallLandResult) => void;

  constructor(manager: SceneManager, physics: PhysicsManager) {
    this.manager = manager;
    this.physics = physics;

    // Plinko specific lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.manager.scene.add(ambient);

    const spot = new THREE.SpotLight(0x00ffff, 10);
    spot.position.set(0, 20, 10);
    spot.lookAt(0, 0, 0);
    this.manager.scene.add(spot);

    const spot2 = new THREE.SpotLight(0xff00ff, 10);
    spot2.position.set(0, -10, 15);
    spot2.lookAt(0, 0, 0);
    this.manager.scene.add(spot2);

    this.manager.addUpdateable(this.update);
  }

  public async buildBoard(rows: number) {
     // Wait for physics to be ready
     if (!this.physics.world) await this.physics.init();

     // Store current rows for multiplier calculation
     this.currentRows = rows;

     // Cleanup old board
     this.pegs.forEach(peg => this.manager.scene.remove(peg));
     this.pegs = [];

     if (this.physics.world) {
       this.staticBodies.forEach(body => {
          if (this.physics.world) this.physics.world.removeRigidBody(body);
       });
     }
     this.staticBodies = [];

     // Add pegs (Triangular grid)
     for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= r; c++) {
           const peg = new THREE.Mesh(
              new THREE.CylinderGeometry(0.15, 0.15, 0.5, 16),
              new THREE.MeshStandardMaterial({
                 color: 0xcccccc,
                 emissive: 0x222222,
                 metalness: 0.8,
                 roughness: 0.2
              })
           );

           // Rotate to face camera (Z out)
           peg.rotation.x = Math.PI / 2;

           const x = (c - r / 2) * 1.4;
           const y = 8 - r * 1.4;
           peg.position.set(x, y, 0);
           this.manager.scene.add(peg);

           // Add physics body
           if (this.physics.world) {
               const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, 0);
               const body = this.physics.world.createRigidBody(bodyDesc);
               // peg is a cylinder pointing along Z in visually since we rotated it
               const ballColliderDesc = RAPIER.ColliderDesc.ball(0.15);
               this.physics.world.createCollider(ballColliderDesc, body);
               this.staticBodies.push(body);
           }

           this.pegs.push(peg);
        }
     }

     // Adjust camera to properly frame the board
     if (this.manager.camera instanceof THREE.OrthographicCamera) {
        // Center camera vertically on the board
        // Board spans from y=9 (ball spawn) to y=8-(rows-1)*1.4 (bottom pegs)
        const boardTop = 9;
        const boardBottom = 8 - (rows - 1) * 1.4 - 2; // Extra space for multiplier zone
        const boardCenter = (boardTop + boardBottom) / 2;
        const boardHeight = boardTop - boardBottom;
        
        this.manager.camera.position.set(0, boardCenter, 20);
        this.manager.camera.lookAt(0, boardCenter, 0);
        
        // Calculate appropriate zoom to show entire board
        const targetHeight = boardHeight * 1.2; // 20% padding
        this.manager.camera.zoom = 20 / targetHeight;
        if (this.manager.camera.zoom > 1.5) this.manager.camera.zoom = 1.5;
        if (this.manager.camera.zoom < 0.5) this.manager.camera.zoom = 0.5;
        this.manager.camera.updateProjectionMatrix();
     }
  }

  public dropBall(path: number[]) {
     if (!this.physics.world) return;
     
     const ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 32, 32),
        new THREE.MeshStandardMaterial({ 
           color: 0xffcc00, 
           metalness: 0.9, 
           roughness: 0.1,
           emissive: 0xffaa00,
           emissiveIntensity: 0.5
        })
     );
     
     // Start at top row (r=0) but slightly above
     // Add slight jitter so balls don't stack exactly perfectly vertically
     const jitterX = (Math.random() - 0.5) * 0.1;
     ball.position.set(jitterX, 9, 0);
     this.manager.scene.add(ball);
     this.balls.push(ball);

     const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(jitterX, 9, 0);
     const body = this.physics.world.createRigidBody(bodyDesc);
     
     // Restitution (bounciness) and friction
     const colliderDesc = RAPIER.ColliderDesc.ball(0.25).setRestitution(0.6).setFriction(0.1); 
     this.physics.world.createCollider(colliderDesc, body);
     
     ball.userData = {
         body,
         path,
         currentRow: 0,
         startX: jitterX
     };

     // Slight initial downward impulse
     body.applyImpulse({ x: 0, y: -0.5, z: 0 }, true);
  }

  private update = (_dt: number) => {
     if (this.physics.world) {
        this.physics.step(this.manager.scene);
     }

     // Steering logic and multiplier detection
     this.balls.forEach(ball => {
        const body = ball.userData.body as RAPIER.RigidBody;
        if (!body) return;

        const pos = body.translation();

        // Row detection: pegs are at y = 8, 6.6, 5.2, ... (spacing of 1.4)
        // Ball starts at y=9, falls through each row
        const rowHeight = 1.4;
        const startY = 8.7; // Just above first peg row
        const dist = startY - pos.y;
        const approximateRow = Math.floor(dist / rowHeight);

        const path = ball.userData.path as number[];
        const currentRow = ball.userData.currentRow as number;

        // Apply impulse when reaching a new row peg to enforce the path
        if (approximateRow > currentRow && approximateRow <= path.length) {
            const direction = path[approximateRow - 1]; // 0 (left) or 1 (right)
            const dirX = direction === 1 ? 1 : -1;

            // Apply impulse to steer ball left or right
            body.applyImpulse({ x: dirX * 0.3, y: -0.15, z: 0 }, true);
            ball.userData.currentRow = approximateRow;
        }

        // Constrain ball to 2D plane (Z = 0)
        const t = body.translation();
        if (Math.abs(t.z) > 0.01) {
            body.setTranslation({ x: t.x, y: t.y, z: 0 }, true);
            const linvel = body.linvel();
            body.setLinvel({ x: linvel.x, y: linvel.y, z: 0 }, true);
        }

        // Check if ball has landed in multiplier zone (below all pegs)
        const bottomPegY = 8 - (this.currentRows - 1) * 1.4;
        const multiplierZoneY = bottomPegY - 1.5; // Below the last peg row

        if (pos.y < multiplierZoneY && !ball.userData.landCallbackTriggered) {
            ball.userData.landCallbackTriggered = true;

            // Calculate which multiplier slot the ball landed in
            // For 8 rows, there are 9 slots spanning from roughly -5.6 to +5.6 in X
            const numSlots = this.currentRows + 1;
            const slotWidth = (numSlots * 1.4) / numSlots; // Approximately 1.4 per slot
            const maxSlotX = (numSlots - 1) * slotWidth / 2;

            // Clamp and normalize X position to slot index
            let slotIndex = Math.floor((pos.x + maxSlotX) / slotWidth);
            slotIndex = Math.max(0, Math.min(numSlots - 1, slotIndex));

            // Default multiplier values (simplified - in production these would come from config)
            const multipliers8 = [
                { value: '5.6x', multiplier: 5.6 },
                { value: '2.1x', multiplier: 2.1 },
                { value: '1.1x', multiplier: 1.1 },
                { value: '1x', multiplier: 1 },
                { value: '0.5x', multiplier: 0.5 },
                { value: '1x', multiplier: 1 },
                { value: '1.1x', multiplier: 1.1 },
                { value: '2.1x', multiplier: 2.1 },
                { value: '5.6x', multiplier: 5.6 },
            ];

            const multData = multipliers8[slotIndex] || { value: '1x', multiplier: 1 };

            // Trigger callback
            if (this.onBallLand) {
                this.onBallLand({
                    multiplier: multData.value,
                    payout: multData.multiplier,
                    slotIndex
                });
            }
        }
     });

     // Clean up fallen balls
     for (let i = this.balls.length - 1; i >= 0; i--) {
        const ball = this.balls[i];
        if (ball.position.y < -20) {
           this.manager.scene.remove(ball);
           const body = ball.userData.body as RAPIER.RigidBody;
           if (body && this.physics.world) {
              this.physics.world.removeRigidBody(body);
           }
           this.balls.splice(i, 1);
        }
     }
  }

  public dispose() {
     this.manager.removeUpdateable(this.update);
     this.pegs.forEach(p => this.manager.scene.remove(p));
     this.balls.forEach(b => this.manager.scene.remove(b));
     if (this.physics.world) {
        this.staticBodies.forEach(b => this.physics.world?.removeRigidBody(b));
        this.balls.forEach(b => {
           if(b.userData.body) this.physics.world?.removeRigidBody(b.userData.body);
        });
     }
  }
}
