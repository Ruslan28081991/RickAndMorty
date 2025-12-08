import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { charactersAPI } from '@/api';
import { type ICharacters } from '@/widgets';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number>(2);
  const [isHasMore, setIsHasMore] = useState<boolean>(true);
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacters | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadPage = async (page: number) => {
    const data = await charactersAPI.getCharacters(page);
    const isLastPage = data.length < 20;

    setCharacters((prev) => (page === 1 ? data : [...prev, ...data]));
    setNextPage(page + 1);
    setIsHasMore(!isLastPage);
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
        toast.error('Failed to load character list');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const loadNextPage = async () => {
    if (isLoadingMore || !isHasMore) return;

    setIsLoadingMore(true);

    try {
      await loadPage(nextPage);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      toast.error('Failed to load additional characters');
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
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate('/404');
        return;
      }
      setSelectedCharacter(null);
      toast.error(`Character with ID: ${id} not found`);
    }
  };

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        await loadCharacterById(Number(id));
      };
      loadData();
    }
  }, [id]);

  return {
    characters,
    loading: isLoading,
    isLoadingMore,
    hasMore: isHasMore,
    loadNextPage,
    selectedCharacter,
  };
};
