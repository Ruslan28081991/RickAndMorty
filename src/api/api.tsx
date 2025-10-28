import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { type ICharacters } from '@/widgets';

export const Api = () => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://rickandmortyapi.com/api/character',
          {
            cancelToken: source.token,
          }
        );
        setCharacters(
          response.data.results.map((character: ICharacters) => ({
            ...character,
            status: character.status.toLowerCase(),
          }))
        );
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
      source.cancel('Component unmounted');
    };
  }, []);

  return { characters, loading };
};
