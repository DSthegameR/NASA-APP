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
