import { useState } from 'react';

import { Api } from '@/api';
import title from '@/assets/images/title.png';
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
  const { characters, loading } = Api();

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
        <div className='characters__container'>
          {loading ? (
            // ничего лучше не придумал, если есть совет, буду ему рад :)
            <div className='characters__loading'>
              <Loading
                size='large'
                text='Loading characters...'
              />
            </div>
          ) : (
            <>
              {characters.map((character) => (
                <CharactersCard
                  key={character.id}
                  name={character.name}
                  gender={character.gender}
                  image={character.image}
                  location={character.location}
                  species={character.species}
                  status={character.status}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
