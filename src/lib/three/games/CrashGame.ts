import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export class CrashGame {
  private manager: SceneManager;
  private line: THREE.Line;
  private rocket: THREE.Sprite;
  private points: THREE.Vector3[] = [];
  
  // Particles for explosion
  private particles: THREE.Points;
  private particleVelocities: THREE.Vector3[] = [];
  private explosionActive: boolean = false;
  private explosionTime: number = 0;
  
  constructor(manager: SceneManager) {
    this.manager = manager;

    // Exponential curve line
    const material = new THREE.LineBasicMaterial({
      color: 0x00ffcc,
    });
    const geometry = new THREE.BufferGeometry();
    this.line = new THREE.Line(geometry, material);
    this.manager.scene.add(this.line);

    // Rocket Image Sprite
    const textureLoader = new THREE.TextureLoader();
    // Use a clean rocket image URL. SVGs or PNG emojis work well.
    const rocketTexture = textureLoader.load('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png');
    
    // We want the image to scale reasonably in the orthographic view
    const rocketMat = new THREE.SpriteMaterial({ 
        map: rocketTexture,
        color: 0xffffff,
    });
    this.rocket = new THREE.Sprite(rocketMat);
    this.rocket.scale.set(3, 3, 1);
    
    // Set initially at origin
    this.rocket.position.set(0, 0, 0);
    this.manager.scene.add(this.rocket);
    
    // Explosion Particles System (Hidden initially)
    const particleCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount; i++) {
        pPos[i*3] = 0; pPos[i*3+1] = 0; pPos[i*3+2] = 0;
        
        // Random velocities in 3D (mainly 2D XY plane though)
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.particleVelocities.push(new THREE.Vector3(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            (Math.random() - 0.5) * 5
        ));
        
        // Fire colors (Yellow, Orange, Red)
        const color = new THREE.Color();
        const r = Math.random();
        if (r > 0.6) color.setHex(0xffaa00);
        else if (r > 0.3) color.setHex(0xff5500);
        else color.setHex(0xff0000);
        
        pColors[i*3] = color.r;
        pColors[i*3+1] = color.g;
        pColors[i*3+2] = color.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    
    const pMat = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
    });
    this.particles = new THREE.Points(pGeo, pMat);
    this.manager.scene.add(this.particles);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.manager.scene.add(ambient);
    
    // Grid Helper for casino chart feel
    const grid = new THREE.GridHelper(200, 100, 0x00ffcc, 0x222222);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -5;
    this.manager.scene.add(grid);
    
    this.reset();
  }

  public reset() {
     this.points = [];
     this.line.geometry.setFromPoints(this.points);
     this.rocket.position.set(0, 0, 0);
     this.rocket.visible = true; // ensure it's visible after previous crash
     this.rocket.material.color.setHex(0xffffff); // reset color
     
     // Reset particles
     this.explosionActive = false;
     this.explosionTime = 0;
     (this.particles.material as THREE.PointsMaterial).opacity = 0;
     
     // Restore line material if it crashed
     if (this.line.material instanceof THREE.LineBasicMaterial) {
         this.line.material.color.setHex(0x00ffcc);
     }

     if (this.manager.camera instanceof THREE.OrthographicCamera) {
         const right = this.manager.camera.right;
         const top = this.manager.camera.top;
         // Position camera so origin (0,0) is at the bottom-left
         // Screen X bounds: [camera.x - right, camera.x + right]
         // Screen Y bounds: [camera.y - top, camera.y + top]
         this.manager.camera.position.set(right - 4, top - 2, 20);
         this.manager.camera.zoom = 1;
         this.manager.camera.updateProjectionMatrix();
     }
  }

  public addPoint(time: number, multiplier: number) {
     // Rocket starts at 0,0 and moves up and right
     const x = time * 3.0; // Horizontal speed
     const y = (multiplier - 1) * 3.0; // Vertical speed
     
     const currentPos = new THREE.Vector3(x, y, 0);
     this.points.push(currentPos);
     
     // Re-create buffer geometry attribute (Line in ThreeJS needs this to draw dynamically)
     this.line.geometry.setFromPoints(this.points);
     this.rocket.position.copy(currentPos);
     
     // Update rocket rotation slightly based on derivative if we wanted, but static 45deg is fine
     
     // Camera follow logic
     if (this.manager.camera instanceof THREE.OrthographicCamera) {
         let didChange = false;
         
         // Keep rocket from going past the center of the screen
         if (x > this.manager.camera.position.x - 2) {
             this.manager.camera.position.x += (x - (this.manager.camera.position.x - 2)) * 0.1;
             didChange = true;
         }
         if (y > this.manager.camera.position.y - 2) {
             this.manager.camera.position.y += (y - (this.manager.camera.position.y - 2)) * 0.1;
             didChange = true;
         }
         
         if (didChange) {
             this.manager.camera.updateProjectionMatrix();
         }
     }
  }

  public update(dt: number) {
      if (this.explosionActive) {
          this.explosionTime += dt;
          
          // Animate particles
          const positions = this.particles.geometry.attributes.position.array as Float32Array;
          for(let i = 0; i < this.particleVelocities.length; i++) {
              positions[i*3] += this.particleVelocities[i].x * dt;
              positions[i*3+1] += this.particleVelocities[i].y * dt;
              positions[i*3+2] += this.particleVelocities[i].z * dt;
              
              // Add slight gravity/drag
              this.particleVelocities[i].y -= 2 * dt; 
          }
          this.particles.geometry.attributes.position.needsUpdate = true;
          
          // Fade out
          const material = this.particles.material as THREE.PointsMaterial;
          material.opacity = Math.max(0, 1 - (this.explosionTime * 1.5));
          
          if (this.explosionTime > 1.0) {
              this.explosionActive = false;
          }
      }
  }

  public turnRed() {
     this.rocket.visible = false; // Hide rocket
     
     // Trigger explosion
     this.explosionActive = true;
     this.explosionTime = 0;
     
     // Move particles to rocket position
     const positions = this.particles.geometry.attributes.position.array as Float32Array;
     for(let i = 0; i < this.particleVelocities.length; i++) {
         positions[i*3] = this.rocket.position.x;
         positions[i*3+1] = this.rocket.position.y;
         positions[i*3+2] = this.rocket.position.z;
         
         // reset velocities slightly for variance
         const speed = Math.random() * 8 + 4;
         this.particleVelocities[i].normalize().multiplyScalar(speed);
     }
     this.particles.geometry.attributes.position.needsUpdate = true;
     
     const pMat = this.particles.material as THREE.PointsMaterial;
     pMat.opacity = 1;
     
     // Color line red
     if (this.line.material instanceof THREE.LineBasicMaterial) {
         this.line.material.color.setHex(0xff0000);
     }
  }

  public dispose() {
     this.manager.scene.remove(this.line);
     this.manager.scene.remove(this.rocket);
     this.manager.scene.remove(this.particles);
  }
}
