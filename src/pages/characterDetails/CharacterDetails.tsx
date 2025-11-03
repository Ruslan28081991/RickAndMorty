import { Link } from 'react-router-dom';

import { ArrowBack } from '@/assets/img';
import { Loading } from '@/shared';

import './CharacterDetails.css';

export const CharacterDetails = () => {
  return (
    <>
      <Link
        to='/'
        className='details-container'
      >
        <img
          className='details-container__img'
          src={ArrowBack}
          alt='arrow back'
        />
        <h3 className='details-container__text'>GO BACK</h3>
      </Link>
      <div className='details-character'>
        <Loading text='Loading character card...' />
      </div>
    </>
  );
};
