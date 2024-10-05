import React from 'react';
import Orrery from './components/Orrery/Orrery';
import DarkModeToggle from './components/DarkModeToggle';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />
      <h1 className="pulse">SomaView</h1>
      <div className="space-border">
        <Orrery />
      </div>
    </div>
  );
}

export default App;
