import { useState } from 'react';

import title from '@/assets/images/title.png';
import { useCharacters } from '@/hooks';
import { Loading } from '@/shared';
import {
  CharactersCard,
  type ICharacterFilters,
  PanelFilters,
} from '@/widgets';

import './CharactersList.css';

export const CharactersList = () => {
  const [filters, setFilters] = useState<ICharacterFilters>({
    name: '',
    species: '',
    status: '',
    gender: '',
  });
  const { characters, loading } = useCharacters();

  return (
    <section className='characters'>
      <img
        className='characters__image'
        src={title}
        alt='Main picture'
      />
      <div className='characters__list'>
        <PanelFilters
          filters={filters}
          onChangeFilters={setFilters}
        />
        <ul className='characters__container'>
          {loading ? (
            <li className='characters__loading'>
              <Loading
                size='large'
                text='Loading characters...'
              />
            </li>
          ) : (
            characters.map((character) => (
              <li key={character.id}>
                <CharactersCard
                  id={character.id}
                  name={character.name}
                  gender={character.gender}
                  image={character.image}
                  location={character.location}
                  species={character.species}
                  status={character.status}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};
