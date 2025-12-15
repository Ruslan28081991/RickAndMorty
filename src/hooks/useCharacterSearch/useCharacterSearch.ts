import { useEffect, useState } from 'react';
import axios from 'axios';

import type { ICharacters } from '@/widgets';

import { useDebounce } from '../useDebounce';

interface ICharacterSearch {
  initialFilters?: {
    name?: string;
    status?: string;
    gender?: string;
    species?: string;
  };
}

export const useCharacterSearch = ({
  initialFilters = {},
}: ICharacterSearch = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchResults, setSearchResults] = useState<ICharacters[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedName = useDebounce(filters.name || '', 300);

  const buildQueryParams = (filters: Record<string, string | undefined>) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim()) {
        params.append(key, value.trim());
      }
    });

    return params;
  };

  const searchCharacters = async (
    searchFilters: Record<string, string | undefined>
  ) => {
    const params = buildQueryParams(searchFilters);

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?${params}`
      );

      return response.data.results || [];
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        return [];
      }
      throw err;
    }
  };

  useEffect(() => {
    const hasActiveFilters =
      debouncedName.trim() ||
      filters.status ||
      filters.gender ||
      filters.species;

    if (!hasActiveFilters) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      setError(null);

      try {
        const searchFilters = {
          name: debouncedName.trim() || undefined,
          status: filters.status,
          gender: filters.gender,
          species: filters.species,
        };

        const results = await searchCharacters(searchFilters);
        setSearchResults(results);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedName, filters.status, filters.gender, filters.species]);

  const updateFilter = (key: string, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  return {
    filters,
    searchResults,
    isSearching,
    error,
    updateFilter,
    setFilters,
  };
};
