import title from '@/assets/images/title.png';
import { Loading } from '@/shared';

import './CharactersList.css';

export const CharactersList = () => {
  return (
    <section className='characters'>
      <div className='characters-container'>
        <img
          className='characters-container__img'
          src={title}
          alt='Main picture'
        />
      </div>
      <div className='characters__list'>
        <Loading text='Loading characters...' />
      </div>
    </section>
  );
};
