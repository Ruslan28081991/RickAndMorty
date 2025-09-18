import arrow from '../../assets/images/arrow.png';
import { Link } from 'react-router-dom';
import { Loading } from '../loading/Loading';
import './CharacterDetails.css';

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
