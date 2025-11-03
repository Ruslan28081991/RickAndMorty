import { useMemo, useState } from 'react';

import type { ICharacterFilters, ICharacters } from '@/widgets';

export const useCharacterFilters = (characters: ICharacters[] = []) => {
  const [filters, setFilters] = useState<ICharacterFilters>({
    name: '',
    species: '',
    gender: '',
    status: '',
  });

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes((filters.name || '').toLowerCase());
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
  }, [characters, filters]);

  return { filters, setFilters, filteredCharacters };
};
