import cn from 'classnames';

import SearchIcon from '../../assets/images/search.svg?react';

import './Input.css';

interface IInput {
  view: 'underline' | 'border';
  size?: 'big' | 'small';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
}

export const Input = ({
  view = 'border',
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
        textInput__underline: view === 'underline',
        textInput__border: view === 'border',
      })}
    >
      {view === 'underline' && <SearchIcon />}
      <input
        className={cn('textInput__input', {
          textInput__inputBig: size === 'big',
          textInput__inputSmall: size === 'small',
        })}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
