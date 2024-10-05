import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Sun from './Sun';
import Planet from './Planet';
import NEO from './NEO';
import { useNEOData } from '../../hooks/useNEOData';
import { PLANETS } from '../../utils/constants';
import UIControls from '../UIControls';
import '../../styles/Orrery.css';

const Orrery = () => {
  const mountRef = useRef(null);
  const { neos, loading, error } = useNEOData();
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(50);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = zoom;

    // Add the Sun
    const sun = new Sun();
    scene.add(sun);

    // Add the planets
    const planets = PLANETS.map(planetData => new Planet(planetData));
    planets.forEach(planet => {
      planet.speed = 0.02 / planet.orbitRadius * speed; // Adjust speed based on state
      scene.add(planet);
    });

    // Add NEOs
    if (neos) {
      neos.forEach(neoData => {
        const neo = new NEO(neoData);
        scene.add(neo);
      });
    }

    // Star Field setup
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      transparent: true
    });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      planets.forEach(planet => planet.orbit());
      starField.rotation.y += 0.0001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [neos, speed, zoom]); // Include speed and zoom in the dependency array

  // Speed and zoom handlers
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  return (
    <div>
      <div ref={mountRef} className="orrery-container" />
      <UIControls onSpeedChange={handleSpeedChange} onZoomChange={handleZoomChange} />
      <div className="orrery-info">
        <h2>Solar System Explorer</h2>
        <p>Drag to rotate. Scroll to zoom.</p>
      </div>
      {loading && <div className="loading pulse">Loading NEO data...</div>}
      {error && <div className="error pulse">Error loading NEO data: {error.message}</div>}
      {neos && (
        <div className="neo-list">
          <h2>Near-Earth Objects</h2>
          <ul>
            {neos.map((neo, index) => (
              <li key={index}>
                <span className="neo-name">{neo.name}</span>
                <br />
                Estimated diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orrery;
