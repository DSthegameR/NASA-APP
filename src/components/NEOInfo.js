// src/components/NEOInfo.js
import React from 'react';

const NEOInfo = ({ neo }) => {
  return (
    <div className="neo-info">
      <h3>{neo.name}</h3>
      <p>Estimated Diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
      <p>Potentially Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      <h4>Close Approach Data:</h4>
      <ul>
        {neo.close_approach_data.map((approach, index) => (
          <li key={index}>
            <p>Date: {approach.close_approach_date_full}</p>
            <p>Distance: {parseInt(approach.miss_distance.kilometers).toLocaleString()} km</p>
            <p>Relative Velocity: {parseInt(approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NEOInfo;