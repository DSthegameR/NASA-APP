// 1. Responsive Design
// Update src/styles/global.css

@media (max-width: 768px) {
  .App h1 {
    font-size: 1.8em;
  }
  
  .orrery-container {
    height: 50vh;
  }
  
  .orrery-info, .neo-list {
    position: static;
    margin: 10px auto;
    max-width: 90%;
  }
}

// 2. Dark Mode Toggle
// Create a new file: src/components/DarkModeToggle.js

import React from 'react';
import { useTheme } from '../hooks/useTheme';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;

// Create a new file: src/hooks/useTheme.js

import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};

// Update src/styles/global.css

body[data-theme='light'] {
  background-color: #f0f0f0;
  color: #333;
}

body[data-theme='light'] .App {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
}

body[data-theme='light'] h1, body[data-theme='light'] h2, body[data-theme='light'] h3,
body[data-theme='light'] h4, body[data-theme='light'] h5, body[data-theme='light'] h6 {
  color: #0066cc;
  text-shadow: none;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
}

// 3. Interactive UI Controls
// Create a new file: src/components/UIControls.js

import React from 'react';

const UIControls = ({ onSpeedChange, onZoomChange }) => {
  return (
    <div className="ui-controls">
      <label>
        Speed:
        <input type="range" min="0" max="2" step="0.1" defaultValue="1" onChange={(e) => onSpeedChange(e.target.value)} />
      </label>
      <label>
        Zoom:
        <input type="range" min="10" max="100" step="1" defaultValue="50" onChange={(e) => onZoomChange(e.target.value)} />
      </label>
    </div>
  );
};

export default UIControls;

// Update src/components/Orrery/Orrery.js

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

  // ... (rest of the component remains the same)

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    planets.forEach(planet => planet.speed = 0.02 / planet.orbitRadius * newSpeed);
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
    camera.position.z = 100 - newZoom;
  };

  return (
    <div>
      <div ref={mountRef} className="orrery-container" />
      <UIControls onSpeedChange={handleSpeedChange} onZoomChange={handleZoomChange} />
      {/* ... (rest of the JSX remains the same) */}
    </div>
  );
};

export default Orrery;

// 4. Particle Effects (Star Field)
// Update src/components/Orrery/Orrery.js

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
  // ... (previous code remains the same)

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 50;

    // Add star field
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

    // ... (rest of the component remains the same)

    const animate = () => {
      requestAnimationFrame(animate);
      planets.forEach(planet => planet.orbit());
      starField.rotation.y += 0.0001;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [neos]);

  // ... (rest of the component remains the same)
};

export default Orrery;

// Update src/App.js

import React from 'react';
import Orrery from './components/Orrery/Orrery';
import DarkModeToggle from './components/DarkModeToggle';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />
      <h1 className="pulse">Cosmic Orrery: Near-Earth Objects Explorer</h1>
      <div className="space-border">
        <Orrery />
      </div>
    </div>
  );
}

export default App;
