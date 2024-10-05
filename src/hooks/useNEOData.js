import { useState, useEffect } from 'react';
import { fetchNEOs } from '../services/nasaApi';

export const useNEOData = () => {
  const [neos, setNeos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNEOs = async () => {
      try {
        const data = await fetchNEOs();
        setNeos(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getNEOs();
  }, []);

  return { neos, loading, error };
};
