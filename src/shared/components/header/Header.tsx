import { Logo } from '@/assets/img';

import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
      <img
        className='header__logo'
        src={Logo}
        alt='logo'
      />
    </header>
  );
};
