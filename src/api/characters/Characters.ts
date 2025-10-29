import axios from 'axios';

import { type ICharacters } from '@/widgets';

export const charactersAPI = {
  getCharacters: async (): Promise<ICharacters[]> => {
    const response = await axios.get(
      'https://rickandmortyapi.com/api/character'
    );

    return response.data.results.map((character: ICharacters) => ({
      ...character,
      status: character.status.toLowerCase(),
    }));
  },
};
