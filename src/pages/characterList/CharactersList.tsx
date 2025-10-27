import { useState } from 'react';

import Rick from '@/assets/images/rick.jpg';
import title from '@/assets/images/title.png';
import { type TStatus } from '@/shared';
import {
  CharactersCard,
  type ICharacterFilters,
  PanelFilters,
} from '@/widgets';

import './CharactersList.css';

export const CharactersList = () => {
  const persons = [
    {
      name: 'Rick Sanchez',
      status: 'alive' as TStatus,
      species: 'Human',
      gender: 'Male',
      location: 'Earth',
      image: Rick,
    },
    {
      name: 'Rick Sanchez',
      status: 'alive' as TStatus,
      species: 'Human',
      gender: 'Male',
      location: 'Earth',
      image: Rick,
    },
    {
      name: 'Rick Sanchez',
      status: 'alive' as TStatus,
      species: 'Human',
      gender: 'Male',
      location: 'Earth',
      image: Rick,
    },
    {
      name: 'Rick Sanchez',
      status: 'alive' as TStatus,
      species: 'Human',
      gender: 'Male',
      location: 'Earth',
      image: Rick,
    },
  ];

  const [filters, setFilters] = useState<ICharacterFilters>({
    name: '',
    species: '',
    status: '',
    gender: '',
  });

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
          {persons.map((per, index) => (
            <CharactersCard
              key={index}
              name={per.name}
              gender={per.gender}
              image={per.image}
              location={per.location}
              species={per.species}
              status={per.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
