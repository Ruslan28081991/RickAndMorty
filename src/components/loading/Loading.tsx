import loading from '../../assets/loading.png';
import type { ILoading } from '../interfaces/Interfaces';
import './Loading.css';

export const Loading = ({ text, size = 'large' }: ILoading) => {
  const rootClass = `loading loading_${size}`;
  return (
    <div className={rootClass}>
      <img
        className='loading_image'
        src={loading}
        alt='loading'
      />
      <h3 className='loading_text'>{text}</h3>
    </div>
  );
};
