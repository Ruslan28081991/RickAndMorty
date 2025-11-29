import { BlackLogo, Light, Ru } from '@/assets/img';

import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
      <img
        className='header__logo'
        src={BlackLogo}
        alt='logo'
      />
      <div className='header__buttons'>
        <button className='header__btn'>
          <img
            src={Light}
            alt='light image'
          />
        </button>
        <button className='header__btn'>
          <img
            src={Ru}
            alt='language iamge'
          />
        </button>
      </div>
    </header>
  );
};
