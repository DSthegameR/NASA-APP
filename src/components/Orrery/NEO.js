import * as THREE from 'three';

class NEO extends THREE.Mesh {
  constructor({ name, estimated_diameter, close_approach_data }) {
    const size = estimated_diameter.kilometers.estimated_diameter_max / 100;
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    super(geometry, material);

    this.name = name;
    this.position.set(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );
  }
}

export default NEO;