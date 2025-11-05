import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { charactersAPI } from '@/api';
import { type ICharacters } from '@/widgets';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchFirstPage = async () => {
      try {
        const { results, info } = await charactersAPI.getCharacters(1);
        setCharacters(results);
        setHasMore(info.next !== null);
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
    fetchFirstPage();

    return () => {
      abortController.abort();
    };
  }, []);

  const loadNextPage = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;
      const { results, info } = await charactersAPI.getCharacters(nextPage);

      setCharacters((prev) => [...prev, ...results]);
      setCurrentPage(nextPage);
      setHasMore(info.next !== null);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        return;
      }
      toast.error('Не удалось загрузить дополнительных персонажей');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    characters,
    loading,
    isLoadingMore,
    hasMore,
    loadNextPage,
  };
};
