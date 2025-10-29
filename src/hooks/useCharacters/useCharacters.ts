import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { charactersAPI } from '@/api';
import { type ICharacters } from '@/widgets';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const data = await charactersAPI.getCharacters();
        setCharacters(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
          return;
        }
        toast.error('Не удалось загрузить список персонажей');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return { characters, loading };
};
