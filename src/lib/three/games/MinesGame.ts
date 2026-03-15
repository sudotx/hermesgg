import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export class MinesGame {
  private manager: SceneManager;
  private tiles: THREE.InstancedMesh;
  private dummy: THREE.Object3D;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private onClickCB?: (index: number) => void;

  private revealed: Set<number> = new Set();
  private gridItems: Map<number, THREE.Mesh | THREE.Group> = new Map();

  constructor(manager: SceneManager) {
    this.manager = manager;
    
    // Setup InstancedMesh for 5x5 grid
    const geometry = new THREE.BoxGeometry(1.8, 0.3, 1.8);
    // Bevel edges roughly using standard geometry or styling
    const material = new THREE.MeshStandardMaterial({
       color: 0x2a2a35,
       metalness: 0.3,
       roughness: 0.4
    });
    this.tiles = new THREE.InstancedMesh(geometry, material, 25);
    
    this.dummy = new THREE.Object3D();
    
    let idx = 0;
    // Lay out 5x5 grid centered
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const x = (c - 2) * 2.1;
            const z = (r - 2) * 2.1;
            this.dummy.position.set(x, 0, z);
            this.dummy.updateMatrix();
            this.tiles.setMatrixAt(idx, this.dummy.matrix);
            idx++;
        }
    }
    this.tiles.instanceMatrix.needsUpdate = true;
    
    // Tilt the board slightly
    this.tiles.rotation.x = -Math.PI / 8; 
    
    this.manager.scene.add(this.tiles);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.manager.scene.add(ambient);
    
    const dir = new THREE.DirectionalLight(0xffaaaa, 2);
    dir.position.set(5, 10, 5);
    this.manager.scene.add(dir);

    const dir2 = new THREE.DirectionalLight(0xaaffff, 2);
    dir2.position.set(-5, 10, -5);
    this.manager.scene.add(dir2);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.manager.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
  }

  public setOnClick(cb: (idx: number) => void) {
      this.onClickCB = cb;
  }

  private onPointerDown = (event: PointerEvent) => {
      const rect = this.manager.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.manager.camera);
      const intersects = this.raycaster.intersectObject(this.tiles);

      if (intersects.length > 0) {
          const instanceId = intersects[0].instanceId;
          if (instanceId !== undefined && !this.revealed.has(instanceId)) {
              if (this.onClickCB) this.onClickCB(instanceId);
          }
      }
  }

  public revealTile(idx: number, isMine: boolean) {
      if (this.revealed.has(idx)) return;
      this.revealed.add(idx);

      // Hide the tile
      this.tiles.getMatrixAt(idx, this.dummy.matrix);
      this.dummy.matrix.decompose(this.dummy.position, this.dummy.quaternion, this.dummy.scale);
      
      const tilePos = this.dummy.position.clone();
      
      this.dummy.scale.set(0, 0, 0);
      this.dummy.updateMatrix();
      this.tiles.setMatrixAt(idx, this.dummy.matrix);
      this.tiles.instanceMatrix.needsUpdate = true;

      // Render the item in place of the tile
      const group = new THREE.Group();
      
      // Calculate world position based on tiles group rotation
      tilePos.applyEuler(this.tiles.rotation);
      group.position.copy(tilePos);
      
      if (isMine) {
          // Mine (Red Sphere + particles optionally)
          const geo = new THREE.SphereGeometry(0.7, 32, 32);
          const mat = new THREE.MeshStandardMaterial({ 
              color: 0xff0000, 
              metalness: 0.5, 
              roughness: 0.2,
              emissive: 0x880000
          });
          const mesh = new THREE.Mesh(geo, mat);
          group.add(mesh);
          
          const light = new THREE.PointLight(0xff0000, 2, 5);
          group.add(light);
      } else {
          // Gem (Diamond/Octahedron)
          const geo = new THREE.OctahedronGeometry(0.7, 0);
          const mat = new THREE.MeshStandardMaterial({ 
              color: 0x00ffcc, 
              metalness: 0.8, 
              roughness: 0.1,
              emissive: 0x005544
          });
          const mesh = new THREE.Mesh(geo, mat);
          group.add(mesh);

          const light = new THREE.PointLight(0x00ffcc, 2, 5);
          group.add(light);
      }

      // Add simple pop animation using scaling
      let scale = 0;
      const animateScale = () => {
          scale += 0.1;
          if (scale < 1) {
              group.scale.set(scale, scale, scale);
              requestAnimationFrame(animateScale);
          } else {
              group.scale.set(1, 1, 1);
          }
      };
      animateScale();

      this.manager.scene.add(group);
      this.gridItems.set(idx, group);
  }
  
  public resetBoard() {
      let idx = 0;
      for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 5; c++) {
              const x = (c - 2) * 2.1;
              const z = (r - 2) * 2.1;
              this.dummy.position.set(x, 0, z);
              this.dummy.scale.set(1, 1, 1);
              this.dummy.updateMatrix();
              this.tiles.setMatrixAt(idx, this.dummy.matrix);
              idx++;
          }
      }
      this.tiles.instanceMatrix.needsUpdate = true;
      this.revealed.clear();
      
      this.gridItems.forEach(item => this.manager.scene.remove(item));
      this.gridItems.clear();
  }

  public dispose() {
      this.manager.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
      this.manager.scene.remove(this.tiles);
      this.gridItems.forEach(item => this.manager.scene.remove(item));
  }
}
