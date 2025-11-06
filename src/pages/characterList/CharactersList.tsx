import { Title } from '@/assets/img';
import { useCharacterFilters, useCharacters } from '@/hooks';
import { LazyLoad, Loading } from '@/shared';
import { CharactersCard, PanelFilters } from '@/widgets';

import './CharactersList.css';

export const CharactersList = () => {
  const { characters, loading, isLoadingMore, hasMore, loadNextPage } =
    useCharacters();
  const { filters, setFilters, filteredCharacters } =
    useCharacterFilters(characters);

  return (
    <section className='characters'>
      <img
        className='characters__image'
        src={Title}
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
            <LazyLoad
              items={filteredCharacters}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadNextPage={loadNextPage}
            >
              {(character) => <CharactersCard {...character} />}
            </LazyLoad>
          )}
        </ul>
      </div>
    </section>
  );
};
