import { useEffect, useRef } from 'react';
import { SceneManager } from '../lib/three/SceneManager';

interface GameCanvasProps {
  onSceneInit?: (manager: SceneManager) => void;
  className?: string;
  cameraType?: 'perspective' | 'orthographic';
}

export function GameCanvas({ onSceneInit, className, cameraType = 'perspective' }: GameCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<SceneManager | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const manager = new SceneManager({
      container: containerRef.current,
      cameraType
    });
    managerRef.current = manager;

    if (onSceneInit) {
      onSceneInit(manager);
    }

    return () => {
      manager.dispose();
      managerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={`w-full h-full relative overflow-hidden ${className || ''}`} />;
}
