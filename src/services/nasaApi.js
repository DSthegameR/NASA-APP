const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

export const fetchNEOs = async () => {
  const today = new Date().toISOString().split('T')[0];
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch NEO data');
  }
  const data = await response.json();
  return data.near_earth_objects[today];
};

