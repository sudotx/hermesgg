import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export class RouletteGame {
   private manager: SceneManager;
   private wheel: THREE.Group;
   private ball: THREE.Mesh;
   
   private isSpinning = false;
   private wheelVelocity = 0.5; // ambient spin
   private ballVelocity = 0;
   private ballAngle = 0;
   private ballRadius = 4.6;
   
   private targetNumber = 0;
   
   // Standard European order
   public readonly ROULETTE_NUMBERS = [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
   ];

   constructor(manager: SceneManager) {
     this.manager = manager;

     this.wheel = new THREE.Group();
     
     // Base Cylinder (dark wood/metal)
     const baseGeo = new THREE.CylinderGeometry(4.8, 5, 0.4, 64);
     const baseMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.4 });
     const base = new THREE.Mesh(baseGeo, baseMat);
     this.wheel.add(base);

     // Inner cone (silver center)
     const coneGeo = new THREE.ConeGeometry(3, 0.6, 32);
     const coneMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.9, roughness: 0.2 });
     const cone = new THREE.Mesh(coneGeo, coneMat);
     cone.position.y = 0.2;
     this.wheel.add(cone);

     // Slots
     const slotAngle = (Math.PI * 2) / 37;
     const reds = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
     
     for (let i = 0; i < 37; i++) {
        const num = this.ROULETTE_NUMBERS[i];
        let color = 0x111111; // black
        if (num === 0) color = 0x00cc00; // green
        else if (reds.includes(num)) color = 0xdd1111; // red

        const slotGeo = new THREE.BoxGeometry(0.7, 0.1, 1.2);
        const slotMat = new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.7 });
        const slot = new THREE.Mesh(slotGeo, slotMat);
        
        // Arrange in a circle
        const angle = i * slotAngle;
        slot.position.x = Math.cos(angle) * 4.0;
        slot.position.z = Math.sin(angle) * 4.0;
        slot.position.y = 0.25;
        // Rotate box to align with perimeter
        slot.rotation.y = -angle; 
        
        this.wheel.add(slot);
     }
     
     // Tilt the wheel towards camera (X axis)
     this.wheel.rotation.x = Math.PI / 6;
     this.manager.scene.add(this.wheel);

     // The ball (shiny white sphere)
     const ballGeo = new THREE.SphereGeometry(0.15, 16, 16);
     const ballMat = new THREE.MeshStandardMaterial({ 
         color: 0xffffff, 
         metalness: 0.2, 
         roughness: 0.1,
         emissive: 0xffffff,
         emissiveIntensity: 0.2
     });
     this.ball = new THREE.Mesh(ballGeo, ballMat);
     // Start ball parked on 0 loosely
     this.ballAngle = 0;
     this.ballRadius = 4.0;
     this.manager.scene.add(this.ball);
     
     // Lighting
     const ambient = new THREE.AmbientLight(0xffffff, 0.4);
     this.manager.scene.add(ambient);
     
     const spot = new THREE.SpotLight(0xffaadd, 5);
     spot.position.set(0, 15, 10);
     spot.lookAt(0,0,0);
     this.manager.scene.add(spot);

     const spot2 = new THREE.SpotLight(0xddffff, 2);
     spot2.position.set(-10, 5, -10);
     spot2.lookAt(0,0,0);
     this.manager.scene.add(spot2);

     if (this.manager.camera instanceof THREE.PerspectiveCamera) {
         this.manager.camera.position.set(0, 6, 12);
         this.manager.camera.lookAt(0, 0, 0);
     } else if (this.manager.camera instanceof THREE.OrthographicCamera) {
         this.manager.camera.position.set(0, 5, 10);
         this.manager.camera.lookAt(0, 0, 0);
         this.manager.camera.zoom = 1.0;
         this.manager.camera.updateProjectionMatrix();
     }

     this.manager.addUpdateable(this.update);
   }

   public spin(targetNumber: number) {
      this.targetNumber = targetNumber;
      this.isSpinning = true;
      
      // High initial velocities
      this.wheelVelocity = 3.0; // rad/s clockwise
      this.ballVelocity = -5.0; // rad/s counter-clockwise
      this.ballRadius = 4.6; // outer rim
   }

   private update = (dt: number) => {
      // Rotate wheel
      this.wheel.rotation.y += this.wheelVelocity * dt;

      if (this.isSpinning) {
         // Decelerate wheel slightly to a resting spin speed
         if (this.wheelVelocity > 0.3) {
             this.wheelVelocity -= 0.4 * dt;
         }

         // Decelerate ball much faster
         // Use a lerp-like multiplier for deceleration
         if (Math.abs(this.ballVelocity) > 0.05) {
             // Exponential decay of velocity
             this.ballVelocity -= this.ballVelocity * 0.4 * dt; 
         }

         this.ballAngle += this.ballVelocity * dt;

         // Fall inward as velocity drops
         if (Math.abs(this.ballVelocity) < 2.0 && this.ballRadius > 4.0) {
             this.ballRadius -= 0.4 * dt;
             // add a bit of rattle
             this.ballRadius += (Math.random() - 0.5) * 0.05 * (this.ballRadius - 4.0);
         }

         // Hook onto wheel when slow enough and close enough
         if (Math.abs(this.ballVelocity) < 0.2 && this.ballRadius <= 4.1) {
             this.isSpinning = false;
         }
      } else {
         // Follow the wheel slots (locked in)
         const targetIdx = this.ROULETTE_NUMBERS.indexOf(this.targetNumber);
         const slotAngleOffsets = (Math.PI * 2) / 37;
         // Find exact absolute angle of that slot in world space
         this.ballAngle = this.wheel.rotation.y + (targetIdx * slotAngleOffsets);
         this.ballRadius = 4.0; 
      }

      // Map ball logical position to 3D space accounting for wheel tilt
      const bx = Math.cos(this.ballAngle) * this.ballRadius;
      // Wheel spins on Y, tilted on X. So ball Z is mapped from Y in 2D space.
      const bz = Math.sin(this.ballAngle) * this.ballRadius;
      
      const v = new THREE.Vector3(bx, 0.4, bz);
      // apply wheel's X tilt
      v.applyEuler(new THREE.Euler(this.wheel.rotation.x, 0, 0));
      
      this.ball.position.copy(v);
   }

   public dispose() {
       this.manager.removeUpdateable(this.update);
       this.manager.scene.remove(this.wheel);
       this.manager.scene.remove(this.ball);
   }
}
