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
  private gridItems: Map<number, THREE.Sprite> = new Map();

  // Callbacks
  public onMineHit?: () => void;

  constructor(manager: SceneManager) {
    this.manager = manager;

    // Setup InstancedMesh for 5x5 grid
    const geometry = new THREE.BoxGeometry(1.8, 0.3, 1.8);
    const material = new THREE.MeshStandardMaterial({
       color: 0x2a2a35,
       metalness: 0.3,
       roughness: 0.4
    });
    this.tiles = new THREE.InstancedMesh(geometry, material, 25);

    this.dummy = new THREE.Object3D();

    let idx = 0;
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

    // Simple ambient lighting only - sprites don't need lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.manager.scene.add(ambient);

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

  private createMineTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Glow effect
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      
      // Bomb body
      ctx.beginPath();
      ctx.arc(64, 70, 35, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a1a';
      ctx.fill();
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Bomb shine
      ctx.beginPath();
      ctx.arc(52, 58, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      // Fuse
      ctx.beginPath();
      ctx.moveTo(64, 35);
      ctx.quadraticCurveTo(70, 20, 80, 15);
      ctx.strokeStyle = '#8b4513';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Spark
      ctx.beginPath();
      ctx.arc(80, 15, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffaa00';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(80, 15, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffff00';
      ctx.fill();
      
      // Skull crossbones hint (simple X)
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 60);
      ctx.lineTo(78, 88);
      ctx.moveTo(78, 60);
      ctx.lineTo(50, 88);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private createGemTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Glow effect
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(0, 255, 204, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 255, 204, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      
      // Diamond shape
      ctx.beginPath();
      ctx.moveTo(64, 20);
      ctx.lineTo(95, 55);
      ctx.lineTo(64, 105);
      ctx.lineTo(33, 55);
      ctx.closePath();
      
      // Fill with gradient
      const gemGradient = ctx.createLinearGradient(40, 40, 90, 90);
      gemGradient.addColorStop(0, '#00ffcc');
      gemGradient.addColorStop(0.5, '#00ccaa');
      gemGradient.addColorStop(1, '#009988');
      ctx.fillStyle = gemGradient;
      ctx.fill();
      
      // Outline
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Facets (shine lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(64, 20);
      ctx.lineTo(64, 55);
      ctx.moveTo(33, 55);
      ctx.lineTo(64, 55);
      ctx.moveTo(95, 55);
      ctx.lineTo(64, 55);
      ctx.stroke();
      
      // Highlight
      ctx.beginPath();
      ctx.moveTo(55, 35);
      ctx.lineTo(64, 45);
      ctx.lineTo(50, 50);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  public revealTile(idx: number, isMine: boolean) {
      if (this.revealed.has(idx)) return;
      this.revealed.add(idx);

      // Hide the tile
      this.tiles.getMatrixAt(idx, this.dummy.matrix);
      this.dummy.matrix.decompose(this.dummy.position, this.dummy.quaternion, this.dummy.scale);

      // Get world position - account for tiles group rotation
      const tilePos = this.dummy.position.clone();
      tilePos.applyEuler(this.tiles.rotation);

      // Scale down tile
      this.dummy.scale.set(0.01, 0.01, 0.01);
      this.dummy.updateMatrix();
      this.tiles.setMatrixAt(idx, this.dummy.matrix);
      this.tiles.instanceMatrix.needsUpdate = true;

      // Create sprite for mine or gem
      const texture = isMine ? this.createMineTexture() : this.createGemTexture();
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
      });

      const sprite = new THREE.Sprite(material);

      // Position - sprites always face camera, no rotation math needed
      // Apply the board tilt to position correctly in world space
      sprite.position.copy(tilePos);
      sprite.position.y += 0.8; // Above the tilted board

      // Start small for scale animation
      sprite.scale.set(0.01, 0.01, 0.01);

      this.manager.scene.add(sprite);
      this.gridItems.set(idx, sprite);

      // Animate with overshoot for impact
      const targetScale = isMine ? 2.5 : 2.0;
      const overshoot = 1.3;
      let scale = 0;
      let phase: 'grow' | 'overshoot' | 'settle' = 'grow';
      let animProgress = 0;

      const animate = () => {
        animProgress += 0.08;
        
        if (phase === 'grow') {
          scale = Math.min(animProgress * targetScale, targetScale);
          if (scale >= targetScale) phase = 'overshoot';
        } else if (phase === 'overshoot') {
          scale = targetScale * overshoot - (animProgress - 1) * targetScale * 0.5;
          if (scale <= targetScale) {
            scale = targetScale;
            phase = 'settle';
          }
        } else if (phase === 'settle') {
          // Micro bounce settle
          const bounce = Math.sin((animProgress - 1.5) * 10) * 0.1 * Math.exp(-(animProgress - 1.5) * 3);
          scale = targetScale + bounce;
        }
        
        sprite.scale.set(scale, scale, scale);
        
        if (animProgress < 2.5) {
          requestAnimationFrame(animate);
        } else {
          sprite.scale.set(targetScale, targetScale, targetScale);
        }
      };
      
      animate();

      // Trigger mine hit callback for screen flash
      if (isMine && this.onMineHit) {
        this.onMineHit();
      }
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
