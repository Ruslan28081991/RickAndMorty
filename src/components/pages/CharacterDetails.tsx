import './CharacterDetails.css';

import { Link } from 'react-router-dom';

import arrow from '../../assets/images/arrow.png';
import { Loading } from '../loading/Loading';

export const CharacterDetails = () => {
  return (
    <>
      <Link
        to='/'
        className='details_container'
      >
        <img
          className='details_container_img'
          src={arrow}
          alt='arrow back'
        />
        <h3 className='details_container_text'>GO BACK</h3>
      </Link>
      <div className='details_character'>
        <Loading text='Loading character card...' />
      </div>
    </>
  );
};
