import axios from 'axios';
import { useState, useEffect } from 'react';

export const Api = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
        setLoading(false);
        setData([]);
      }
    };
    fetch();
  }, []);
  return { data, loading, setData };
};
