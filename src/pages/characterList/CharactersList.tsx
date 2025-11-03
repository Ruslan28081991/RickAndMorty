import title from '@/assets/images/title.png';
import { useCharacterFilters, useCharacters } from '@/hooks';
import { Loading } from '@/shared';
import { CharactersCard, PanelFilters } from '@/widgets';

import './CharactersList.css';

export const CharactersList = () => {
  const { characters, loading } = useCharacters();
  const { filters, setFilters, filteredCharacters } =
    useCharacterFilters(characters);

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
            filteredCharacters.map((character) => (
              <li key={character.id}>
                <CharactersCard {...character} />
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};
