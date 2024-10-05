import * as THREE from 'three';

class Sun extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    super(geometry, material);
  }
}

export default Sun;
