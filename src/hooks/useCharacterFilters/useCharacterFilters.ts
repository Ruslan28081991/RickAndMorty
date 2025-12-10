import { useEffect, useState } from 'react';
import axios from 'axios';

import { DEBOUNCE_DELAY } from '@/shared/constants';
import type { ICharacterFilters, ICharacters } from '@/widgets';

import { useDebounce } from '../useDebounce';

export const useCharacterFilters = (characters: ICharacters[] = []) => {
  const [filters, setFilters] = useState<ICharacterFilters>({
    name: '',
    species: '',
    gender: '',
    status: '',
  });
  //
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  //
  const debouncedName = useDebounce(filters.name, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!debouncedName?.trim()) {
      setSearchResults([]);
      return;
    }

    const searchByName = async () => {
      setIsSearching(true);

      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${debouncedName}`
        );

        const filtered = response.data.results.filter(
          (character: ICharacters) => {
            const matchesSpecies =
              !filters.species ||
              character.species.toLowerCase() === filters.species.toLowerCase();
            const matchesStatus =
              !filters.status ||
              character.status.toLowerCase() === filters.status.toLowerCase();
            const matchesGender =
              !filters.gender ||
              character.gender.toLowerCase() === filters.gender.toLowerCase();

            return matchesSpecies && matchesStatus && matchesGender;
          }
        );

        setSearchResults(filtered);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setSearchResults([]);
        }
      } finally {
        setIsSearching(false);
      }
    };

    searchByName();
  }, [debouncedName, filters.status, filters.gender, filters.species]);

  return {
    filters,
    setFilters,
    filteredCharacters: debouncedName ? searchResults : characters,
    isSearching,
  };
};
