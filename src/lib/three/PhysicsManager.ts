import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';

export class PhysicsManager {
  public world: RAPIER.World | null = null;
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    await RAPIER.init();
    const gravity = { x: 0, y: -9.81, z: 0 };
    this.world = new RAPIER.World(gravity);
    this.isInitialized = true;
  }

  public createPhysicsBall(mesh: THREE.Mesh, radius: number = 0.5) {
    if (!this.world) return;
    
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(mesh.position.x, mesh.position.y, mesh.position.z);
    const body = this.world.createRigidBody(bodyDesc);
    
    const colliderDesc = RAPIER.ColliderDesc.ball(radius);
    this.world.createCollider(colliderDesc, body);
    
    mesh.userData.body = body;
    return body;
  }

  public createStaticBox(mesh: THREE.Mesh, hw: number, hh: number, hd: number) {
     if (!this.world) return;
     
     const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(mesh.position.x, mesh.position.y, mesh.position.z);
     const body = this.world.createRigidBody(bodyDesc);

     const colliderDesc = RAPIER.ColliderDesc.cuboid(hw, hh, hd);
     this.world.createCollider(colliderDesc, body);

     mesh.userData.body = body;
     return body;
  }

  public createStaticCylinder(mesh: THREE.Mesh, radius: number, halfHeight: number) {
    if (!this.world) return;
    
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(mesh.position.x, mesh.position.y, mesh.position.z);
    // Rapier cylinder is aligned along Y axis by default
    const body = this.world.createRigidBody(bodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.cylinder(halfHeight, radius);
    this.world.createCollider(colliderDesc, body);

    mesh.userData.body = body;
    return body;
  }

  step(scene: THREE.Scene) {
    if (this.isInitialized && this.world) {
      this.world.step();
      
      // Update physics to visual
      scene.traverse((obj) => {
        if (obj.userData.body) {
          const body = obj.userData.body as RAPIER.RigidBody;
          if (body.isDynamic()) {
            const pos = body.translation();
            const rot = body.rotation();
            obj.position.set(pos.x, pos.y, pos.z);
            obj.quaternion.set(rot.x, rot.y, rot.z, rot.w);
          }
        }
      });
    }
  }

  dispose() {
    if (this.isInitialized && this.world) {
      this.world.free();
      this.world = null;
      this.isInitialized = false;
    }
  }
}
