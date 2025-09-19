import logo from '../../assets/images/logo.png';
import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
      <img
        className='header_logo'
        src={logo}
        alt='logo'
      />
    </header>
  );
};
