import loading from '../../assets/images/loading.png';
import './Loading.css';

interface ILoading {
  text?: string;
  size?: 'small' | 'large';
}

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
