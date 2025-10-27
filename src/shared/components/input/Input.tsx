import type { ComponentType, SVGProps } from 'react';
import cn from 'classnames';

import './Input.css';

interface IInput {
  view?: 'underlined' | 'bordered';
  size?: 'medium' | 'small';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  autoFocus?: boolean;
}

export const Input = ({
  view = 'underlined',
  size = 'small',
  placeholder,
  value,
  onChange,
  icon: IconComponent,
  autoFocus,
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
      {IconComponent && <IconComponent className='textInput__icon' />}
      <input
        className={cn('textInput__input', {
          textInput__input_medium: size === 'medium',
          textInput__input_small: size === 'small',
        })}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </div>
  );
};
