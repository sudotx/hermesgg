import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export type SpinState = 'idle' | 'launch' | 'spin' | 'decel' | 'settle' | 'locked';

export interface SpinResult {
  number: number;
  index: number;
}

export class RouletteGame {
  private manager: SceneManager;
  private wheel: THREE.Group;
  private ball: THREE.Mesh;

  // State machine
  private state: SpinState = 'idle';
  private targetIndex = 0;
  
  // Animation timing
  private spinStartTime = 0;
  private spinDuration = 5.0; // seconds
  private settleTime = 0;
  
  // Ball physics (animation-driven, not simulation)
  private ballAngle = 0;
  private ballRadius = 4.0;
  private baseBallAngle = 0;
  private targetBallAngle = 0;
  
  // Wheel animation
  private wheelTargetRotation = 0;
  
  // Visual effects
  private oscillationTime = 0;
  
  // Callbacks
  public onSpinEnd?: (result: SpinResult) => void;

  // Standard European roulette order (clockwise from 0)
  public readonly ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  // Color mapping
  private readonly RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

  constructor(manager: SceneManager) {
    this.manager = manager;

    this.wheel = new THREE.Group();

    // Base Cylinder (dark wood/metal)
    const baseGeo = new THREE.CylinderGeometry(4.8, 5, 0.4, 64);
    const baseMat = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      metalness: 0.6, 
      roughness: 0.4,
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    this.wheel.add(base);

    // Inner cone (silver center)
    const coneGeo = new THREE.ConeGeometry(3, 0.6, 32);
    const coneMat = new THREE.MeshStandardMaterial({ 
      color: 0xaaaaaa, 
      metalness: 0.9, 
      roughness: 0.2,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = 0.2;
    this.wheel.add(cone);

    // Outer ring (gold trim)
    const ringGeo = new THREE.TorusGeometry(4.5, 0.15, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.1;
    this.wheel.add(ring);

    // Slots using wedge-shaped geometry
    const slotAngle = (Math.PI * 2) / 37;
    const innerRadius = 3.6;
    const outerRadius = 4.4;

    for (let i = 0; i < 37; i++) {
      const num = this.ROULETTE_NUMBERS[i];
      let color = 0x111111; // black
      if (num === 0) color = 0x00aa00; // green
      else if (this.RED_NUMBERS.includes(num)) color = 0xcc1111; // red

      // Create wedge-shaped pocket using RingGeometry segment
      const slotGeo = new THREE.RingGeometry(innerRadius, outerRadius, 64, 1, i * slotAngle, slotAngle);
      const slotMat = new THREE.MeshStandardMaterial({ 
        color, 
        metalness: 0.3, 
        roughness: 0.7,
        side: THREE.DoubleSide,
      });
      const slot = new THREE.Mesh(slotGeo, slotMat);

      // Position flat on the wheel plane
      slot.position.y = 0.22;
      slot.rotation.x = -Math.PI / 2;

      // Add number text using canvas texture
      const numberTexture = this.createNumberTexture(num.toString(), color);
      const numberMat = new THREE.SpriteMaterial({ map: numberTexture });
      const numberSprite = new THREE.Sprite(numberMat);
      
      // Position number in the middle of the slot
      const midAngle = i * slotAngle + slotAngle / 2;
      const midRadius = (innerRadius + outerRadius) / 2;
      numberSprite.position.set(
        Math.cos(midAngle) * midRadius,
        0.26,
        Math.sin(midAngle) * midRadius
      );
      numberSprite.scale.set(0.4, 0.4, 1);
      
      this.wheel.add(slot);
      this.wheel.add(numberSprite);
    }

    // Tilt the wheel towards camera (X axis)
    this.wheel.rotation.x = Math.PI / 6;
    this.manager.scene.add(this.wheel);

    // The ball (shiny white sphere with slight glow)
    const ballGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.1,
      emissive: 0xffffff,
      emissiveIntensity: 0.15,
    });
    this.ball = new THREE.Mesh(ballGeo, ballMat);
    this.ball.position.set(4.0, 0.3, 0);
    this.manager.scene.add(this.ball);

    // Single directional light for clean, dramatic highlights
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    dirLight.lookAt(0, 0, 0);
    this.manager.scene.add(dirLight);

    // Subtle ambient for fill
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.manager.scene.add(ambient);

    // Setup perspective camera
    if (this.manager.camera instanceof THREE.PerspectiveCamera) {
      this.manager.camera.position.set(0, 7, 10);
      this.manager.camera.lookAt(0, 0, 0);
    } else if (this.manager.camera instanceof THREE.OrthographicCamera) {
      // Fallback: reposition for better angle
      this.manager.camera.position.set(0, 6, 10);
      this.manager.camera.lookAt(0, 0, 0);
    }

    // Register update loop with SceneManager
    this.manager.addUpdateable(this.update);

    this.reset();
  }

  private createNumberTexture(text: string, bgColor: number): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background circle
      ctx.fillStyle = '#' + new THREE.Color(bgColor).getHexString();
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();
      
      // Border
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Text
      ctx.fillStyle = bgColor === 0x111111 ? '#ffffff' : '#ffffff';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 32, 32);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  public reset() {
    this.state = 'idle';
    this.ballAngle = 0;
    this.ballRadius = 4.0;
    this.wheel.rotation.y = 0;
    this.updateBallPosition();
  }

  public spin(targetIndex: number) {
    this.targetIndex = targetIndex;
    this.state = 'launch';
    this.spinStartTime = performance.now();
    this.oscillationTime = 0;
    
    // Calculate target angle: target slot + 3-5 full spins for drama
    const slotAngle = (Math.PI * 2) / 37;
    const fullSpins = 4 + Math.random() * 1; // 4-5 spins
    this.targetBallAngle = (targetIndex * slotAngle) + (fullSpins * Math.PI * 2);
    
    // Wheel rotates slightly opposite direction for visual interest
    this.wheelTargetRotation = -0.5; // Small counter-rotation
    
    // Start ball at current position
    this.baseBallAngle = this.ballAngle;
    this.ballRadius = 4.5; // Start at outer edge
  }

  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  private updateBallPosition() {
    // Map ball logical position to 3D space accounting for wheel tilt
    const bx = Math.cos(this.ballAngle) * this.ballRadius;
    const bz = Math.sin(this.ballAngle) * this.ballRadius;

    const v = new THREE.Vector3(bx, 0.35, bz);
    // Apply wheel's X tilt
    v.applyEuler(new THREE.Euler(this.wheel.rotation.x, 0, 0));

    this.ball.position.copy(v);
  }

  private update = (dt: number) => {
    const elapsed = (performance.now() - this.spinStartTime) / 1000;
    const progress = Math.min(elapsed / this.spinDuration, 1);
    
    this.oscillationTime += dt;

    if (this.state === 'launch') {
      // Quick acceleration phase
      if (progress > 0.1) {
        this.state = 'spin';
      }
      // Ball stays at outer edge during launch
      this.ballRadius = THREE.MathUtils.lerp(this.ballRadius, 4.6, dt * 2);
      
    } else if (this.state === 'spin') {
      // High speed counter-clockwise spin
      const spinProgress = (progress - 0.1) / 0.5; // 0-1 over 50% of duration
      
      if (spinProgress >= 1) {
        this.state = 'decel';
        this.settleTime = elapsed;
      } else {
        // Ball spins fast counter-clockwise
        const currentAngle = this.baseBallAngle - (spinProgress * Math.PI * 6); // 3 full rotations
        this.ballAngle = currentAngle;
        
        // Ball stays near outer edge
        this.ballRadius = 4.5 + Math.sin(this.oscillationTime * 20) * 0.02;
      }
      
    } else if (this.state === 'decel') {
      // Deceleration phase - ball slows and drops inward
      const decelProgress = Math.min((elapsed - this.settleTime) / 1.5, 1);
      const eased = this.easeOutQuad(decelProgress);
      
      // Interpolate ball angle toward target
      this.ballAngle = THREE.MathUtils.lerp(
        this.ballAngle,
        this.targetBallAngle,
        eased * 0.15
      );
      
      // Ball drops inward smoothly
      this.ballRadius = THREE.MathUtils.lerp(4.5, 4.0, eased);
      
      // Add subtle oscillation that decreases with deceleration
      const oscillation = Math.sin(this.oscillationTime * 15) * 0.03 * (1 - decelProgress);
      this.ballRadius += oscillation;
      
      if (decelProgress >= 0.95) {
        this.state = 'settle';
      }
      
    } else if (this.state === 'settle') {
      // Settling phase - ball finds its slot with near-miss behavior
      const settleProgress = Math.min((elapsed - this.settleTime - 1.5) / 1.0, 1);
      
      // Calculate exact target angle relative to wheel
      const slotAngle = (Math.PI * 2) / 37;
      const targetSlotAngle = this.targetIndex * slotAngle;
      
      // Near-miss: overshoot slightly then settle back
      const overshoot = Math.sin(settleProgress * Math.PI) * 0.1 * (1 - settleProgress);
      
      // Micro-oscillation for realism (metal settling)
      const microOscillation = Math.sin(this.oscillationTime * 30) * 0.005 * (1 - settleProgress);
      
      this.ballAngle = targetSlotAngle + overshoot + microOscillation;
      this.ballRadius = 4.0;
      
      if (settleProgress >= 1) {
        this.state = 'locked';
        // Final snap to exact position
        this.ballAngle = targetSlotAngle;
        
        // Notify React that spin is complete
        if (this.onSpinEnd) {
          this.onSpinEnd({
            number: this.ROULETTE_NUMBERS[this.targetIndex],
            index: this.targetIndex,
          });
        }
      }
      
    } else if (this.state === 'locked') {
      // Ball locked to wheel slot - rotates with wheel
      const slotAngle = (Math.PI * 2) / 37;
      const targetSlotAngle = this.targetIndex * slotAngle;
      
      // Ball rotates with the wheel
      this.ballAngle = this.wheel.rotation.y + targetSlotAngle;
      this.ballRadius = 4.0;
      
      // Subtle vibration for life
      this.ball.position.y = 0.35 + Math.sin(this.oscillationTime * 40) * 0.001;
    }

    // Wheel rotation (subtle, mostly stationary)
    if (this.state !== 'locked') {
      this.wheel.rotation.y = THREE.MathUtils.lerp(
        this.wheel.rotation.y,
        this.wheelTargetRotation,
        dt * 0.5
      );
    } else {
      // Slow ambient rotation when locked
      this.wheel.rotation.y += dt * 0.05;
    }

    this.updateBallPosition();
  };

  public getState(): SpinState {
    return this.state;
  }

  public getResult(): SpinResult | null {
    if (this.state === 'locked') {
      return {
        number: this.ROULETTE_NUMBERS[this.targetIndex],
        index: this.targetIndex,
      };
    }
    return null;
  }

  public dispose() {
    this.manager.removeUpdateable(this.update);
    this.manager.scene.remove(this.wheel);
    this.manager.scene.remove(this.ball);
    
    // Dispose geometries and materials
    this.wheel.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    this.ball.geometry.dispose();
    (this.ball.material as THREE.Material).dispose();
  }
}
