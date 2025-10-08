import cn from 'classnames';

import SearchIcon from '../../assets/images/search.svg?react';

import './Input.css';

interface IInput {
  view: 'underlined' | 'bordered';
  size?: 'medium' | 'small';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
}

export const Input = ({
  view = 'bordered',
  size,
  placeholder,
  value,
  onChange,
}: IInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      className={cn('textInput', {
        textInput_underlined: view === 'underlined',
        textInput_bordered: view === 'bordered',
      })}
    >
      {view === 'underlined' && <SearchIcon />}
      <input
        className={cn('textInput__input', {
          textInput__input_size_medium: size === 'medium',
          textInput__input_size_small: size === 'small',
        })}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
