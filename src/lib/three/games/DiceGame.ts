import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export class DiceGame {
  private manager: SceneManager;
  private die: THREE.Mesh;
  private isRolling = false;
  private targetFace = 1;
  
  private startRot = new THREE.Euler();
  private targetRot = new THREE.Euler();
  private rollProgress = 0;

  constructor(manager: SceneManager) {
    this.manager = manager;

    const materials = [
      this.createDiceMaterial(1), // right
      this.createDiceMaterial(6), // left
      this.createDiceMaterial(2), // top
      this.createDiceMaterial(5), // bottom
      this.createDiceMaterial(3), // front
      this.createDiceMaterial(4), // back
    ];

    const geometry = new THREE.BoxGeometry(4, 4, 4);
    this.die = new THREE.Mesh(geometry, materials);
    
    // Tilt it slightly initially
    this.die.rotation.set(0.5, 0.5, 0);

    this.manager.scene.add(this.die);

    // Dynamic Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.manager.scene.add(ambient);

    const spot = new THREE.SpotLight(0xffaadd, 5);
    spot.position.set(5, 10, 5);
    spot.lookAt(0,0,0);
    this.manager.scene.add(spot);

    const dir = new THREE.DirectionalLight(0x00ffff, 2);
    dir.position.set(-5, 0, 5);
    this.manager.scene.add(dir);

    // Setup camera
    if (this.manager.camera instanceof THREE.PerspectiveCamera) {
        this.manager.camera.position.set(0, 5, 12);
        this.manager.camera.lookAt(0, 0, 0);
    } else if (this.manager.camera instanceof THREE.OrthographicCamera) {
        this.manager.camera.position.set(0, 5, 10);
        this.manager.camera.lookAt(0, 0, 0);
        this.manager.camera.zoom = 1.2;
        this.manager.camera.updateProjectionMatrix();
    }

    this.manager.addUpdateable(this.update);
  }

  private createDiceMaterial(num: number) {
     const canvas = document.createElement('canvas');
     canvas.width = 512;
     canvas.height = 512;
     const ctx = canvas.getContext('2d')!;
     
     // Background (White rounded aesthetic)
     ctx.fillStyle = '#f0f0f5';
     ctx.fillRect(0, 0, 512, 512);
     
     // Simulated Bevel/Border
     ctx.fillStyle = '#ffffff';
     ctx.fillRect(16, 16, 480, 480);
     
     ctx.strokeStyle = '#e0e0ea';
     ctx.lineWidth = 8;
     ctx.strokeRect(16, 16, 480, 480);

     // Draw Dots
     ctx.fillStyle = '#1a1a2e';
     const drawDot = (x: number, y: number) => {
        ctx.beginPath();
        // Shadow
        ctx.arc(x+4, y+4, 40, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fill();
        // Dot
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a2e';
        ctx.fill();
     };

     const center = 256;
     const offset = 120;

     if ([1, 3, 5].includes(num)) drawDot(center, center);
     if ([2, 3, 4, 5, 6].includes(num)) {
         drawDot(center - offset, center - offset);
         drawDot(center + offset, center + offset);
     }
     if ([4, 5, 6].includes(num)) {
         drawDot(center + offset, center - offset);
         drawDot(center - offset, center + offset);
     }
     if (num === 6) {
         drawDot(center - offset, center);
         drawDot(center + offset, center);
     }

     const tex = new THREE.CanvasTexture(canvas);
     tex.anisotropy = 16; // high quality texture rendering
     
     return new THREE.MeshStandardMaterial({ 
        map: tex, 
        roughness: 0.1, 
        metalness: 0.2, // shiny dice
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
     } as any); // using any for clearcoat to avoid older threejs type issues
  }

  // The box faces are defined by index:
  // 0: Right (1)
  // 1: Left (6)
  // 2: Top (2)
  // 3: Bottom (5)
  // 4: Front (3)
  // 5: Back (4)
  public getRotationForFace(face: number): THREE.Vector3 {
      // Returns Euler angles to face the camera (+Z)
      switch(face) {
          case 1: return new THREE.Vector3(0, -Math.PI/2, 0); 
          case 6: return new THREE.Vector3(0, Math.PI/2, 0);
          case 2: return new THREE.Vector3(Math.PI/2, 0, 0);
          case 5: return new THREE.Vector3(-Math.PI/2, 0, 0);
          case 3: return new THREE.Vector3(0, 0, 0);
          case 4: return new THREE.Vector3(Math.PI, 0, 0); // or Math.PI on X or Y
      }
      return new THREE.Vector3(0, 0, 0);
  }

  public roll(targetFace: number) {
      if (this.isRolling) return;
      this.isRolling = true;
      this.targetFace = targetFace;
      this.rollProgress = 0;
      
      this.startRot.copy(this.die.rotation);
      
      const baseTarget = this.getRotationForFace(targetFace);
      // Add extra 3-5 full rotations for drama
      const spinsX = Math.PI * 2 * (Math.floor(Math.random() * 3) + 3);
      const spinsY = Math.PI * 2 * (Math.floor(Math.random() * 3) + 3);
      const spinsZ = Math.PI * 2 * (Math.floor(Math.random() * 3) + 3);

      this.targetRot.set(
          baseTarget.x + spinsX,
          baseTarget.y + spinsY,
          baseTarget.z + spinsZ
      );
  }

  private update = (dt: number) => {
      if (!this.isRolling) {
         // Gentle idle floating
         this.die.rotation.y += 0.3 * dt;
         this.die.rotation.x += 0.2 * dt;
         this.die.position.y = Math.sin(Date.now() / 500) * 0.5; // bob up and down
         return;
      }

      this.rollProgress += dt;
      const duration = 2.0;

      // Reset position Y
      this.die.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
      
      if (this.rollProgress < duration) {
          const t = this.rollProgress / duration;
          // easeOutQuart (smooth deceleration)
          const ease = 1 - Math.pow(1 - t, 4);

          this.die.rotation.x = this.startRot.x + (this.targetRot.x - this.startRot.x) * ease;
          this.die.rotation.y = this.startRot.y + (this.targetRot.y - this.startRot.y) * ease;
          this.die.rotation.z = this.startRot.z + (this.targetRot.z - this.startRot.z) * ease;
      } else {
          // Snap purely to target face (remove the 2PI multiples)
          const baseTarget = this.getRotationForFace(this.targetFace);
          this.die.rotation.set(baseTarget.x, baseTarget.y, baseTarget.z);
          this.isRolling = false;
      }
  }

  public dispose() {
      this.manager.removeUpdateable(this.update);
      this.manager.scene.remove(this.die);
  }
}
