import loading from '../../assets/images/loading.png';
import cn from 'classnames'
import './Loading.css';

interface ILoading {
  text?: string;
  size?: 'small' | 'large';
}

export const Loading = ({ text, size = 'large' }: ILoading) => {
  return (
    <div className={cn('loading', `loading_${size}`)}>
      <img
        className='loading_image'
        src={loading}
        alt='loading'
      />
      <h3 className='loading_text'>{text}</h3>
    </div>
  );
};
