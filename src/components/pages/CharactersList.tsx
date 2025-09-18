import title from '../../assets/title.png';
import { Loading } from '../loading/Loading';
import './CharactersList.css';

export const CharactersList = () => {
  return (
    <section className='characters'>
      <div className='characters_container'>
        <img
          className='characters_img'
          src={title}
          alt='Main picture'
        />
      </div>
      <div className='characters_list'>
        <Loading text='Loading characters...' />
      </div>
    </section>
  );
};
