import cn from 'classnames';

import { LoadingImg } from '@/assets/img';

import './Loading.css';

interface ILoading {
  text?: string;
  size?: 'small' | 'large';
}

export const Loading = ({ text, size = 'large' }: ILoading) => {
  return (
    <div className={cn('loading', `loading_${size}`)}>
      <img
        className='loading__image'
        src={LoadingImg}
        alt='loading'
      />
      <h3 className='loading__text'>{text}</h3>
    </div>
  );
};
