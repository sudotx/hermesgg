import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export class CrashGame {
  private manager: SceneManager;
  private line: THREE.Line;
  private rocket: THREE.Group;
  private points: THREE.Vector3[] = [];
  
  constructor(manager: SceneManager) {
    this.manager = manager;

    // Exponential curve line
    const material = new THREE.LineBasicMaterial({
      color: 0x00ffcc,
    });
    const geometry = new THREE.BufferGeometry();
    this.line = new THREE.Line(geometry, material);
    this.manager.scene.add(this.line);

    // Rocket 
    this.rocket = new THREE.Group();
    const rocketGeo = new THREE.ConeGeometry(0.5, 1.5, 8);
    // Point it right-up
    rocketGeo.rotateZ(-Math.PI / 4);
    
    const rocketMat = new THREE.MeshStandardMaterial({
        color: 0xff2255, 
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xff2255,
        emissiveIntensity: 0.5
    });
    const rocketMesh = new THREE.Mesh(rocketGeo, rocketMat);
    this.rocket.add(rocketMesh);
    
    // Light attached to rocket
    const light = new THREE.PointLight(0xff2255, 2, 10);
    this.rocket.add(light);
    
    // Set initially
    this.rocket.position.set(-8, -4, 0);
    this.manager.scene.add(this.rocket);

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
     this.rocket.position.set(-8, -4, 0);
     
     // Restore material if it crashed
     const mesh = this.rocket.children[0] as THREE.Mesh;
     if (mesh.material instanceof THREE.MeshStandardMaterial) {
         mesh.material.color.setHex(0xff2255);
         mesh.material.emissive.setHex(0xff2255);
     }
     if (this.line.material instanceof THREE.LineBasicMaterial) {
         this.line.material.color.setHex(0x00ffcc);
     }

     if (this.manager.camera instanceof THREE.OrthographicCamera) {
         this.manager.camera.position.set(0, 0, 20);
         this.manager.camera.zoom = 1;
         this.manager.camera.updateProjectionMatrix();
     }
  }

  public addPoint(time: number, multiplier: number) {
     // Base origin is approx -8, -4 in our orthographic view
     const x = -8 + (time * 1.5);
     const y = -4 + ((multiplier - 1) * 2);
     
     const currentPos = new THREE.Vector3(x, y, 0);
     this.points.push(currentPos);
     
     // Re-create buffer geometry attribute (Line in ThreeJS needs this to draw dynamically)
     this.line.geometry.setFromPoints(this.points);
     this.rocket.position.copy(currentPos);
     
     // Update rocket rotation slightly based on derivative if we wanted, but static 45deg is fine
     
     // Camera follow logic
     if (this.manager.camera instanceof THREE.OrthographicCamera) {
         let didChange = false;
         
         // Keep rocket roughly centered if it goes too far
         if (x > this.manager.camera.position.x + 4) {
             this.manager.camera.position.x += (x - (this.manager.camera.position.x + 4)) * 0.1;
             didChange = true;
         }
         if (y > this.manager.camera.position.y + 2) {
             this.manager.camera.position.y += (y - (this.manager.camera.position.y + 2)) * 0.1;
             didChange = true;
         }
         
         if (didChange) {
             this.manager.camera.updateProjectionMatrix();
         }
     }
  }

  public turnRed() {
     const mesh = this.rocket.children[0] as THREE.Mesh;
     if (mesh.material instanceof THREE.MeshStandardMaterial) {
         mesh.material.color.setHex(0x555555);
         mesh.material.emissive.setHex(0x000000);
     }
     if (this.line.material instanceof THREE.LineBasicMaterial) {
         this.line.material.color.setHex(0xff0000);
     }
  }

  public dispose() {
     this.manager.scene.remove(this.line);
     this.manager.scene.remove(this.rocket);
  }
}
