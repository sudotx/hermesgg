import * as THREE from 'three';
import { SceneManager } from '../SceneManager';

export type CrashGameState = 'idle' | 'running' | 'crashed';

export interface CrashGameConfig {
    houseEdge?: number;
    maxMultiplier?: number;
    growthSpeed?: number;
}

export class CrashGame {
    private manager: SceneManager;
    private line: THREE.Line;
    private rocket: THREE.Sprite;

    // Buffer geometry for efficient updates
    private maxPoints: number = 1000;
    private positions: Float32Array;
    private pointCount: number = 0;

    // Particles for explosion
    private particles: THREE.Points;
    private particleVelocities: THREE.Vector3[] = [];
    private explosionTime: number = 0;

    // Game state (ALL logic moved here)
    private state: CrashGameState = 'idle';
    private startTime: number = 0;
    private crashPoint: number = 1.0;
    private currentMultiplier: number = 1.0;
    private growthSpeed: number;
    private houseEdge: number;
    private maxMultiplier: number;

    // Crash anticipation
    private anticipationActive: boolean = false;
    private shakeOffset: THREE.Vector3 = new THREE.Vector3();

    // Callbacks
    public onCrash?: () => void;
    public onMultiplier?: (mult: number) => void;
    public onStateChange?: (state: CrashGameState) => void;

    constructor(manager: SceneManager, config: CrashGameConfig = {}) {
        this.manager = manager;
        this.houseEdge = config.houseEdge ?? 0.01;
        this.maxMultiplier = config.maxMultiplier ?? 20;
        this.growthSpeed = config.growthSpeed ?? 0.08;

        // Exponential curve line with pre-allocated buffer
        this.positions = new Float32Array(this.maxPoints * 3);
        const material = new THREE.LineBasicMaterial({
            color: 0x00ffcc,
            linewidth: 2,
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        geometry.setDrawRange(0, 0);
        this.line = new THREE.Line(geometry, material);
        this.line.frustumCulled = false; // Prevent flickering
        this.manager.scene.add(this.line);

        // Rocket Sprite with procedural texture (no external dependencies)
        const rocketTexture = this.createRocketTexture();
        const rocketMat = new THREE.SpriteMaterial({
            map: rocketTexture,
            color: 0xffffff,
        });
        this.rocket = new THREE.Sprite(rocketMat);
        this.rocket.scale.set(1.5, 1.5, 1);
        this.rocket.position.set(0, 0, 0);
        this.manager.scene.add(this.rocket);

        // Explosion Particles
        const particleCount = 150;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pColors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            pPos[i * 3] = 0;
            pPos[i * 3 + 1] = 0;
            pPos[i * 3 + 2] = 0;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 3;
            this.particleVelocities.push(new THREE.Vector3(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                (Math.random() - 0.5) * 4
            ));

            const color = new THREE.Color();
            const r = Math.random();
            if (r > 0.6) color.setHex(0xffaa00);
            else if (r > 0.3) color.setHex(0xff5500);
            else color.setHex(0xff0000);

            pColors[i * 3] = color.r;
            pColors[i * 3 + 1] = color.g;
            pColors[i * 3 + 2] = color.b;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

        const pMat = new THREE.PointsMaterial({
            size: 0.4,
            vertexColors: true,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        this.particles = new THREE.Points(pGeo, pMat);
        this.manager.scene.add(this.particles);

        // Register update loop with SceneManager
        this.manager.addUpdateable(this.update);

        this.reset();
    }

    private createRocketTexture(): THREE.CanvasTexture {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // Rocket body (pointing up-right at 45 degrees)
            ctx.translate(32, 32);
            ctx.rotate(-Math.PI / 4); // Point toward top-right

            // Main body
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Nose cone
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.moveTo(15, 0);
            ctx.lineTo(28, 0);
            ctx.lineTo(15, 5);
            ctx.lineTo(15, -5);
            ctx.closePath();
            ctx.fill();

            // Fins
            ctx.fillStyle = '#ff6600';
            ctx.beginPath();
            ctx.moveTo(-10, 5);
            ctx.lineTo(-20, 12);
            ctx.lineTo(-5, 5);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-10, -5);
            ctx.lineTo(-20, -12);
            ctx.lineTo(-5, -5);
            ctx.fill();

            // Engine glow
            ctx.fillStyle = '#ffaa00';
            ctx.beginPath();
            ctx.arc(-18, 0, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    public reset() {
        this.state = 'idle';
        this.pointCount = 0;
        this.line.geometry.setDrawRange(0, 0);
        this.line.geometry.attributes.position.needsUpdate = true;

        this.rocket.position.set(0, 0, 0);
        this.rocket.visible = true;
        this.rocket.material.color.setHex(0xffffff);
        this.rocket.material.opacity = 1;

        // Reset particles
        this.explosionTime = 0;
        (this.particles.material as THREE.PointsMaterial).opacity = 0;

        // Reset line color
        if (this.line.material instanceof THREE.LineBasicMaterial) {
            this.line.material.color.setHex(0x00ffcc);
        }

        this.anticipationActive = false;
        this.shakeOffset.set(0, 0, 0);

        // Fixed camera setup for orthographic view
        // Chart shows: X = 0 to 20 seconds, Y = 0 to 10x multiplier
        if (this.manager.camera instanceof THREE.OrthographicCamera) {
            const cam = this.manager.camera;
            
            // Set bounds to show the full chart area with some padding
            cam.left = -1;
            cam.right = 22;      // 20 seconds + padding
            cam.bottom = -1;     
            cam.top = 12;        // 10x multiplier + padding
            cam.zoom = 1;
            cam.updateProjectionMatrix();
            
            // Position camera at center of view and look at scene
            cam.position.set(
                (cam.left + cam.right) / 2,
                (cam.bottom + cam.top) / 2,
                10
            );
            cam.lookAt(0, 0, 0);
        }
    }

    public start() {
        // Generate crash point with improved formula
        const r = Math.random();
        const instantCrash = Math.random() < this.houseEdge;

        if (instantCrash) {
            this.crashPoint = 1.0;
        } else {
            // Improved distribution: more low multipliers, capped high end
            const rawCrash = 1 / (1 - r);
            this.crashPoint = Math.max(1.01, Math.min(rawCrash * 0.99, this.maxMultiplier));
        }

        this.currentMultiplier = 1.0;
        this.startTime = performance.now();
        this.state = 'running';
        this.pointCount = 0;
        this.anticipationActive = false;

        this.onStateChange?.('running');

        // Add starting point
        this.addPoint(0, 1.0);
    }

    public update(dt: number) {
        if (this.state === 'running') {
            const elapsed = (performance.now() - this.startTime) / 1000;

            // Exponential growth: multiplier = e^(k * time)
            this.currentMultiplier = Math.exp(this.growthSpeed * elapsed);

            // Check for crash
            if (this.currentMultiplier >= this.crashPoint) {
                this.currentMultiplier = this.crashPoint;
                this.triggerCrash();
                return;
            }

            // Add point to curve (throttle to ~60 points per second max)
            const timeStep = 1 / 60;
            if (this.pointCount === 0 || elapsed >= (this.pointCount * timeStep)) {
                this.addPoint(elapsed, this.currentMultiplier);
            }

            // Crash anticipation at 85% of crash point
            if (!this.anticipationActive && this.currentMultiplier >= this.crashPoint * 0.85) {
                this.anticipationActive = true;
            }

            // Update rocket position with lerp for smoothness
            const targetPos = this.getCurrentWorldPosition();
            this.rocket.position.lerp(targetPos, 0.2);

            // Update rocket rotation based on curve tangent
            this.updateRocketRotation();

            // Apply shake during anticipation
            if (this.anticipationActive) {
                const shakeIntensity = 0.05 + (this.currentMultiplier / this.crashPoint - 0.85) * 0.3;
                this.shakeOffset.set(
                    (Math.random() - 0.5) * shakeIntensity,
                    (Math.random() - 0.5) * shakeIntensity,
                    0
                );
                this.rocket.position.add(this.shakeOffset);

                // Flicker line color
                const lineMat = this.line.material as THREE.LineBasicMaterial;
                if (Math.random() > 0.7) {
                    lineMat.color.setHex(0xff6600);
                } else {
                    lineMat.color.setHex(0x00ffcc);
                }
            }

            // Notify multiplier update (throttled by caller in React)
            this.onMultiplier?.(this.currentMultiplier);

        } else if (this.state === 'crashed') {
            this.explosionTime += dt;

            const positions = this.particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < this.particleVelocities.length; i++) {
                positions[i * 3] += this.particleVelocities[i].x * dt;
                positions[i * 3 + 1] += this.particleVelocities[i].y * dt;
                positions[i * 3 + 2] += this.particleVelocities[i].z * dt;

                // Velocity damping (not gravity)
                this.particleVelocities[i].multiplyScalar(0.97);
            }
            this.particles.geometry.attributes.position.needsUpdate = true;

            // Fade out over 2 seconds
            const material = this.particles.material as THREE.PointsMaterial;
            material.opacity = Math.max(0, 1 - (this.explosionTime / 2.0));
        }
    }

    private addPoint(time: number, multiplier: number) {
        if (this.pointCount >= this.maxPoints) return;

        const worldPos = this.timeToWorld(time, multiplier);

        this.positions[this.pointCount * 3] = worldPos.x;
        this.positions[this.pointCount * 3 + 1] = worldPos.y;
        this.positions[this.pointCount * 3 + 2] = worldPos.z;

        this.pointCount++;
        this.line.geometry.setDrawRange(0, this.pointCount);
        this.line.geometry.attributes.position.needsUpdate = true;
    }

    private getCurrentWorldPosition(): THREE.Vector3 {
        return this.timeToWorld(
            (performance.now() - this.startTime) / 1000,
            this.currentMultiplier
        );
    }

    private timeToWorld(time: number, multiplier: number): THREE.Vector3 {
        // Chart-space coordinates: consistent scale
        const maxX = 20; // 20 seconds visible
        const maxY = 10; // 10x multiplier visible

        const x = (time / maxX) * 15; // Scale to fit view
        const y = ((multiplier - 1) / maxY) * 10;

        return new THREE.Vector3(x, y, 0);
    }

    private updateRocketRotation() {
        if (this.pointCount < 2) {
            this.rocket.material.rotation = Math.PI / 4;
            return;
        }

        const current = new THREE.Vector3(
            this.positions[(this.pointCount - 1) * 3],
            this.positions[(this.pointCount - 1) * 3 + 1],
            0
        );
        const prev = new THREE.Vector3(
            this.positions[(this.pointCount - 2) * 3],
            this.positions[(this.pointCount - 2) * 3 + 1],
            0
        );

        const angle = Math.atan2(current.y - prev.y, current.x - prev.x);
        this.rocket.material.rotation = angle - Math.PI / 4;
    }

    private triggerCrash() {
        this.state = 'crashed';
        this.onStateChange?.('crashed');
        this.onMultiplier?.(this.crashPoint);

        // Hide rocket
        this.rocket.visible = false;

        // Trigger explosion at rocket position
        this.explosionTime = 0;
        const positions = this.particles.geometry.attributes.position.array as Float32Array;
        const rocketPos = this.getCurrentWorldPosition();

        for (let i = 0; i < this.particleVelocities.length; i++) {
            positions[i * 3] = rocketPos.x;
            positions[i * 3 + 1] = rocketPos.y;
            positions[i * 3 + 2] = rocketPos.z;

            const speed = Math.random() * 8 + 4;
            this.particleVelocities[i].normalize().multiplyScalar(speed);
        }
        this.particles.geometry.attributes.position.needsUpdate = true;

        (this.particles.material as THREE.PointsMaterial).opacity = 1;

        // Turn line red
        if (this.line.material instanceof THREE.LineBasicMaterial) {
            this.line.material.color.setHex(0xff0000);
        }

        this.onCrash?.();
    }

    public getState(): CrashGameState {
        return this.state;
    }

    public getMultiplier(): number {
        return this.currentMultiplier;
    }

    public getCrashPoint(): number {
        return this.crashPoint;
    }

    public dispose() {
        this.manager.removeUpdateable(this.update);
        
        this.manager.scene.remove(this.line);
        this.manager.scene.remove(this.rocket);
        this.manager.scene.remove(this.particles);

        this.line.geometry.dispose();
        (this.line.material as THREE.Material).dispose();
        (this.rocket.material as THREE.SpriteMaterial).map?.dispose();
        (this.rocket.material as THREE.SpriteMaterial).dispose();
        this.particles.geometry.dispose();
        (this.particles.material as THREE.Material).dispose();
    }
}
