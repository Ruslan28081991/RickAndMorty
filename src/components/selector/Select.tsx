import './Select.css';

import cn from 'classnames';
import { useState } from 'react';

import { Status } from '../status/Status';

interface IOptions {
  value: string;
  label: string;
}

interface ISelect {
  size?: 'small';
  options?: IOptions[];
  placeholder?: string;
  withStatus?: boolean;
}

export const Select = ({ size, options, placeholder, withStatus }: ISelect) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IOptions | null>(null);

  const handleSelect = (option: IOptions) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className='custom-select'>
      <div
        className={cn(
          'custom-select__header',
          { 'custom-select__open': open },
          `custom-select__header_${size}`
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected ? (
          <div>
            <span>{selected.label}</span>
            {withStatus && (
              <Status status={selected.label as 'Alive' | 'Dead' | 'Unknown'} />
            )}
          </div>
        ) : (
          <span className='custom-select__placeholder'>{placeholder}</span>
        )}
        <button
          className={cn(
            'custom-select__arrow',
            size && `custom-select__arrow_${size}`,
            open && 'custom-select__arrow_open',
            open && size && `custom-select__arrow_open_${size}`
          )}
          aria-label='Toggle select'
        />
      </div>

      {open && (
        <ul
          className={cn('custom-select__list', `custom-select__list_${size}`)}
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className={cn(
                'custom-select__item',
                `custom-select__item_${size}`
              )}
              onClick={() => handleSelect(option)}
            >
              <span>{option.label}</span>
              {withStatus && (
                <Status status={option.label as 'Alive' | 'Dead' | 'Unknown'} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
