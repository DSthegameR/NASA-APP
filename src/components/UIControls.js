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