import { Link } from 'react-router-dom';

import arrow from '@/assets/images/arrow.png';
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
          src={arrow}
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
