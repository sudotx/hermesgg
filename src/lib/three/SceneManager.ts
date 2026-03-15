import * as THREE from 'three';

export interface SceneManagerOptions {
  container: HTMLElement;
  cameraType?: 'perspective' | 'orthographic';
}

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private resizeObserver: ResizeObserver;
  private animationFrameId: number = 0;
  private updateables: Set<(deltaTime: number) => void> = new Set();
  private clock: THREE.Clock;

  constructor(options: SceneManagerOptions) {
    this.container = options.container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e0e11); // Casino dark theme

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    const aspect = width / height;
    if (options.cameraType === 'orthographic') {
      const d = 10;
      this.camera = new THREE.OrthographicCamera(
        -d * aspect, d * aspect, d, -d, 0.1, 1000
      );
      this.camera.position.set(0, 10, 20);
      this.camera.lookAt(0, 0, 0);
    } else {
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      this.camera.position.set(0, 10, 20);
      this.camera.lookAt(0, 0, 0);
    }

    // Default Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    const light = new THREE.PointLight(0xffcc88, 2);
    light.position.set(10, 20, 10);
    this.scene.add(light);

    // Resize handling
    this.resizeObserver = new ResizeObserver(() => this.onWindowResize());
    this.resizeObserver.observe(this.container);

    this.clock = new THREE.Clock();
    
    // Start animation loop
    this.animate();
  }

  public addUpdateable(fn: (deltaTime: number) => void) {
    this.updateables.add(fn);
  }

  public removeUpdateable(fn: (deltaTime: number) => void) {
    this.updateables.delete(fn);
  }

  private onWindowResize() {
    if (!this.container) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    } else if (this.camera instanceof THREE.OrthographicCamera) {
      const aspect = width / height;
      const d = 10;
      this.camera.left = -d * aspect;
      this.camera.right = d * aspect;
      this.camera.top = d;
      this.camera.bottom = -d;
      this.camera.updateProjectionMatrix();
    }
    
    this.renderer.setSize(width, height);
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    
    const deltaTime = this.clock.getDelta();
    
    this.updateables.forEach(fn => fn(deltaTime));
    
    this.renderer.render(this.scene, this.camera);
  }

  public dispose() {
    cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver.disconnect();
    
    this.updateables.clear();
    
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
    
    this.renderer.dispose();
  }
}
