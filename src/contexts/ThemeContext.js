// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// src/contexts/SimulationContext.js
import React, { createContext, useState, useContext } from 'react';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(50);

  return (
    <SimulationContext.Provider value={{ speed, setSpeed, zoom, setZoom }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);