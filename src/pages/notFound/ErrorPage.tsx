import { Link } from 'react-router-dom';

import { NotFoundImg } from '@/assets/img';

import './ErrorPage.css';

export const ErrorPage = () => {
  return (
    <div className='error-page'>
      <img
        className='error-page__img'
        src={NotFoundImg}
        alt='not found image'
      />
      <Link
        className='error-page__btn'
        to='/'
      >
        Go to main page
      </Link>
    </div>
  );
};
