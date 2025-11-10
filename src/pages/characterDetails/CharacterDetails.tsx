import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ArrowBack } from '@/assets/img';
import { useCharacters } from '@/hooks';
import { Loading } from '@/shared';

import './CharacterDetails.css';

export const CharacterDetails = () => {
  const { selectedCharacter, loadCharacterById } = useCharacters();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        await loadCharacterById(Number(id));
      };
      loadData();
    }
  }, [id, loadCharacterById]);

  return (
    <>
      <Link
        to='/'
        className='characterDetails__btn'
      >
        <img
          src={ArrowBack}
          alt='arrow back'
        />
        <h3 className='characterDetails__btn-text'>GO BACK</h3>
      </Link>
      <div className='characterDetails'>
        {selectedCharacter ? (
          <div className='characterDetails__content'>
            <div className='characterDetails__wrapper'>
              <img
                className='characterDetails__image'
                src={selectedCharacter.image}
                alt={`Image ${selectedCharacter.name}`}
              />
              <h2 className='characterDetails__name'>
                {selectedCharacter.name}
              </h2>
              <span className='characterDetails__title'>Information</span>
            </div>

            <dl className='characterDetails__list'>
              <dt className='characterDetails__item'>Gender</dt>
              <dd className='characterDetails__item-text'>
                {selectedCharacter.gender}
              </dd>

              <dt className='characterDetails__item'>Status</dt>
              <dd className='characterDetails__item-text'>
                {selectedCharacter.status}
              </dd>

              <dt className='characterDetails__item'>Specie</dt>
              <dd className='characterDetails__item-text'>
                {selectedCharacter.species}
              </dd>

              <dt className='characterDetails__item'>Origin</dt>
              <dd className='characterDetails__item-text'>
                {selectedCharacter.origin?.name}
              </dd>

              <dt className='characterDetails__item'>Type</dt>
              <dd className='characterDetails__item-text'>
                {selectedCharacter.type || 'unknown'}
              </dd>

              <dt className='characterDetails__item'>Location</dt>
              <dd className='characterDetails__item-text'>
                {selectedCharacter.location.name}
              </dd>
            </dl>
          </div>
        ) : (
          <Loading text='Loading character card...' />
        )}
      </div>
    </>
  );
};
