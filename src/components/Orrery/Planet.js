import * as THREE from 'three';

class Planet extends THREE.Mesh {
  constructor({ name, color, size, orbitRadius }) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    super(geometry, material);

    this.name = name;
    this.orbitRadius = orbitRadius;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.02 / orbitRadius;

    this.position.x = Math.cos(this.angle) * orbitRadius;
    this.position.z = Math.sin(this.angle) * orbitRadius;
  }

  orbit() {
    this.angle += this.speed;
    this.position.x = Math.cos(this.angle) * this.orbitRadius;
    this.position.z = Math.sin(this.angle) * this.orbitRadius;
  }
}

export default Planet;
