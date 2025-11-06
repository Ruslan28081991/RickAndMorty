import axios from 'axios';

import { type ICharacters } from '@/widgets';

export const charactersAPI = {
  getCharacters: async (page: number = 1): Promise<ICharacters[]> => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    const characters = response.data.results.map((character: ICharacters) => ({
      ...character,
      status: character.status.toLowerCase(),
    }));

    return characters;
  },
};
