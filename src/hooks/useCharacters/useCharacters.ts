import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { charactersAPI } from '@/api';
import { type ICharacters } from '@/widgets';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number>(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacters | null>(null);

  const loadPage = async (page: number) => {
    const data = await charactersAPI.getCharacters(page);
    const isLastPage = data.length < 20;

    setCharacters((prev) => (page === 1 ? data : [...prev, ...data]));
    setNextPage(page + 1);
    setHasMore(!isLastPage);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        await loadPage(1);
      } catch (error) {
        if (axios.isCancel(error)) {
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

  const loadNextPage = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      await loadPage(nextPage);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      toast.error('Не удалось загрузить дополнительных персонажей');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const loadCharacterById = async (id: number) => {
    try {
      const character = await charactersAPI.getCharacterById(id);
      setSelectedCharacter(character);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      setSelectedCharacter(null);
      toast.error(`Персонаж с ID ${id} не найден`);
    }
  };

  return {
    characters,
    loading,
    isLoadingMore,
    hasMore,
    loadNextPage,
    selectedCharacter,
    loadCharacterById,
  };
};
