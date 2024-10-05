// src/components/Header.js
import React from 'react';
import DarkModeToggle from './DarkModeToggle';


const Header = () => (
  <header className="app-header">
    <h1>Cosmic Orrery: Near-Earth Objects Explorer</h1>
    <DarkModeToggle />
  </header>
);


// src/components/DarkModeToggle.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};


// src/components/Controls.js
import React from 'react';
import { useSimulation } from '../contexts/SimulationContext';

const Controls = () => {
  const { speed, setSpeed, zoom, setZoom } = useSimulation();

  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="speed">Simulation Speed</label>
        <input
          type="range"
          id="speed"
          min="0"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label htmlFor="zoom">Zoom Level</label>
        <input
          type="range"
          id="zoom"
          min="10"
          max="100"
          value={zoom}
          onChange={(e) => setZoom(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Controls;

// src/components/StarField.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const StarField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.z += 0.0001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

