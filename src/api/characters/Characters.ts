import axios from 'axios';

import { type ICharacters } from '@/widgets';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/character';

export const charactersAPI = {
  getCharacters: async (page: number = 1): Promise<ICharacters[]> => {
    const response = await axios.get(`?page=${page}`);

    const characters = response.data.results.map((character: ICharacters) => ({
      ...character,
      status: character.status.toLowerCase(),
    }));

    return characters;
  },

  getCharacterById: async (id: number): Promise<ICharacters> => {
    const response = await axios.get(`/${id}`);
    if (!response.data) {
      throw new Error(`Character with ID: ${id} not found`);
    }

    return response.data;
  },
};
