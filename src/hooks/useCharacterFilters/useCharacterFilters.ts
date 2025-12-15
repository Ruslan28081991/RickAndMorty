import { useMemo } from 'react';

import type { ICharacterFilters, ICharacters } from '@/widgets';

import { useCharacterSearch } from '../useCharacterSearch';
import { useUrlFilters } from '../useUrlFilters';

export const useCharacterFilters = (characters: ICharacters[] = []) => {
  const { filters: urlFilters, updateUrl, resetFilters } = useUrlFilters();
  const {
    filters: searchFilters,
    searchResults,
    isSearching,
    error,
    updateFilter: updateSearchFilter,
  } = useCharacterSearch({ initialFilters: urlFilters });

  const updateFilter = (key: string, value: string | undefined) => {
    updateSearchFilter(key, value);
    const newFilters = { ...searchFilters, [key]: value };
    updateUrl(newFilters);
  };

  const setFilters = (newFilters: ICharacterFilters) => {
    Object.entries(newFilters).forEach(([key, value]) => {
      updateSearchFilter(key, value);
    });
    updateUrl(newFilters);
  };

  const locallyFilteredCharacters = useMemo(() => {
    const hasNameSearch = searchFilters.name?.trim();

    if (hasNameSearch) {
      return [];
    }

    return characters.filter((character) => {
      const matchesStatus =
        !searchFilters.status || character.status === searchFilters.status;
      const matchesGender =
        !searchFilters.gender || character.gender === searchFilters.gender;
      const matchesSpecies =
        !searchFilters.species || character.species === searchFilters.species;

      return matchesStatus && matchesGender && matchesSpecies;
    });
  }, [characters, searchFilters]);

  const displayCharacters = searchFilters.name?.trim()
    ? searchResults
    : locallyFilteredCharacters;

  return {
    filters: searchFilters,
    filteredCharacters: displayCharacters,
    isSearching,
    error,
    setFilters,
    updateFilter,
    resetFilters,
    isUsingApiSearch: Boolean(searchFilters.name?.trim()),
    totalResults: displayCharacters.length,
  };
};
