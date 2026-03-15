import { useEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import RAPIER from "@dimforge/rapier3d-compat";

export interface ThreeGameConfig {
  cameraPosition?: [number, number, number];
  fov?: number; // Field of view for PerspectiveCamera
  orthographic?: boolean; // Use OrthographicCamera if true
  zoom?: number; // Zoom for OrthographicCamera
  gravity?: { x: number; y: number; z: number };
}

export const useThreeGame = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  config: ThreeGameConfig = {}
) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const physicsWorldRef = useRef<RAPIER.World | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e11); // Dark casino background
    sceneRef.current = scene;

    // 2. Camera Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    let camera: THREE.Camera;

    if (config.orthographic) {
      const aspect = width / height;
      const zoom = config.zoom || 10;
      camera = new THREE.OrthographicCamera(
        -zoom * aspect,
        zoom * aspect,
        zoom,
        -zoom,
        0.1,
        1000
      );
    } else {
      camera = new THREE.PerspectiveCamera(
        config.fov || 75,
        width / height,
        0.1,
        1000
      );
    }

    camera.position.set(...(config.cameraPosition || [0, 10, 20]));
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting (Standard Casino Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffcc88, 2);
    pointLight.position.set(10, 20, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    // Add a subtle rim light for depth
    const rimLight = new THREE.PointLight(0x4444ff, 1);
    rimLight.position.set(-10, 5, -10);
    scene.add(rimLight);

    // 5. Physics Setup
    const gravity = config.gravity || { x: 0, y: -9.81, z: 0 };
    
    let world: RAPIER.World | null = null;
    
    const initPhysics = async () => {
        await RAPIER.init();
        world = new RAPIER.World(gravity);
        physicsWorldRef.current = world;
    };
    
    // Initialize Physics asynchronously then start loop
    initPhysics().then(() => {
       // Start Animation Loop
        const animate = () => {
        requestRef.current = requestAnimationFrame(animate);

        // Update Physics
        if (world) {
            world.step();
            // Sync physics bodies with meshes
            scene.traverse((obj) => {
             if (obj.userData.body) {
                const position = obj.userData.body.translation();
                const rotation = obj.userData.body.rotation();
                obj.position.set(position.x, position.y, position.z);
                obj.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
             }
            });
        }

        renderer.render(scene, camera);
        };
        animate(); 
    });

    // Cleanup
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (physicsWorldRef.current) {
        physicsWorldRef.current.free();
      }
    };
  }, []); // Run once on mount

  return {
    scene: sceneRef,
    camera: cameraRef,
    renderer: rendererRef,
    physicsWorld: physicsWorldRef,
  };
};
