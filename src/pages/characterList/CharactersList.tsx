import { Title } from '@/assets/img';
import { useCharacterFilters, useCharacters } from '@/hooks';
import { LazyLoad, Loading } from '@/shared';
import { CharactersCard, PanelFilters } from '@/widgets';

import './CharactersList.css';

export const CharactersList = () => {
  const { characters, isLoading, isLoadingMore, isHasMore, loadNextPage } =
    useCharacters();
  const { filters, setFilters, filteredCharacters, isUsingApiSearch } =
    useCharacterFilters(characters);

  const shouldLoadMore = isHasMore && !isUsingApiSearch;

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
          {isLoading ? (
            <li className='characters__loading'>
              <Loading
                size='large'
                text='Loading characters...'
              />
            </li>
          ) : (
            <LazyLoad
              items={filteredCharacters}
              isHasMore={shouldLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadNextPage={loadNextPage}
            >
              {(character) => <CharactersCard {...character} />}
            </LazyLoad>
          )}
          {filteredCharacters.length === 0 ? (
            <div className='characters__empty'>Список персонажей пуст...</div>
          ) : (
            ''
          )}
        </ul>
      </div>
    </section>
  );
};
