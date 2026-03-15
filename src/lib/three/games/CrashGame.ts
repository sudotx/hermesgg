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
         const cam = this.manager.camera;
         const w = cam.right - cam.left;
         const h = cam.top - cam.bottom;
         
         cam.position.set(0, 0, 20); // Reset position temporarily to origin centered
         cam.zoom = 1;
         
         // Move origin so it looks like bottom left
         cam.position.x = w / 2 - 2;
         cam.position.y = h / 2 - 2;
         cam.updateProjectionMatrix();
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
     
     // Calculate orientation (rocket's nose points to tangent)
     let angle = Math.PI / 4; // Default starting angle facing up-right
     if (this.points.length > 1) {
         const prev = this.points[this.points.length - 2];
         angle = Math.atan2(currentPos.y - prev.y, currentPos.x - prev.x);
     }
     
     // The raw rocket emoji image naturally points to top-right (angle PI/4).
     // Since sprite material rotation is in radians counter-clockwise around center:
     const targetRotation = angle - Math.PI / 4;
     this.rocket.material.rotation = targetRotation;
     
     // Camera dynamic scaling / zooming logic
     if (this.manager.camera instanceof THREE.OrthographicCamera) {
         const cam = this.manager.camera;
         const w = cam.right - cam.left;
         const h = cam.top - cam.bottom;
         
         // We want the rocket to stay within ~70% of the visible un-zoomed frustum
         const paddingX = 4;
         const paddingY = 4;
         const targetZoomX = (w * 0.7) / Math.max(x + paddingX, w * 0.7);
         const targetZoomY = (h * 0.7) / Math.max(y + paddingY, h * 0.7);
         
         const targetZoom = Math.min(1.0, targetZoomX, targetZoomY);
         
         // Smooth interpolate
         cam.zoom += (targetZoom - cam.zoom) * 0.05;
         
         // Now pan the camera so the point (0,0) stays at the bottom-left of the zoomed area
         const visibleW = w / cam.zoom;
         const visibleH = h / cam.zoom;
         
         // Let's say bottom-left is exactly -2, -2 padding inside view
         const targetPosX = -2 + (visibleW / 2);
         const targetPosY = -2 + (visibleH / 2);
         
         cam.position.x = targetPosX;
         cam.position.y = targetPosY;
         
         cam.updateProjectionMatrix();
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
