import { useMemo, useState } from 'react';

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
  const debouncedName = useDebounce(filters.name, DEBOUNCE_DELAY);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes((debouncedName || '').toLowerCase());
      const matchesSpecies =
        !filters.species ||
        character.species.toLowerCase() === filters.species.toLowerCase();
      const matchesStatus =
        !filters.status ||
        character.status.toLowerCase() === filters.status.toLowerCase();
      const matchesGender =
        !filters.gender ||
        character.gender.toLowerCase() === filters.gender.toLowerCase();

      return matchesName && matchesSpecies && matchesStatus && matchesGender;
    });
  }, [characters, filters, debouncedName]);

  return { filters, setFilters, filteredCharacters };
};
