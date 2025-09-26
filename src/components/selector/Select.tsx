import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Status } from '../status/Status';

import './Select.css';

interface IOptions {
  readonly value: string;
  readonly label: string;
}

interface ISelect {
  size?: 'default' | 'small';
  value?: string;
  options?: readonly IOptions[];
  placeholder?: string;
  withStatus?: boolean;
  onChange?: (value: string) => void;
}

export const Select = ({
  size,
  options,
  value,
  placeholder,
  withStatus,
  onChange,
}: ISelect) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IOptions | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: IOptions) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option.value);
  };

  const selectedIsStatus =
    !!selected &&
    (selected.label === 'Alive' ||
      selected.label === 'Dead' ||
      selected.label === 'Unknown');

  useEffect(() => {
    if (!value) {
      setSelected(null);
      return;
    }
    const findValue = options?.find((opt) => opt.value === value) || null;
    setSelected(findValue);
  }, [value, options]);

  return (
    <div className='select'>
      <div
        className={cn('select__header', {
          select__open: open,
          select__header_small: size == 'small',
        })}
        onClick={() => setOpen((prev) => !prev)}
        ref={selectRef}
      >
        {selected ? (
          <div className='select__wrapper'>
            <span>{selected.label}</span>
            {withStatus && selectedIsStatus && (
              <Status status={selected.label} />
            )}
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <button
          className={cn('select__arrow', {
            select__arrow_open: open,
            select__arrow_small: size == 'small',
            select__arrow_open_small: open && size == 'small',
          })}
          aria-label='Toggle select'
        />
      </div>

      {open && (
        <ul
          className={cn('select__list', {
            select__list_small: size == 'small',
          })}
        >
          {options?.map((option) => {
            const optionIsStatus =
              option.label === 'Alive' ||
              option.label === 'Dead' ||
              option.label === 'Unknown';
            return (
              <li
                key={option.value}
                className={cn('select__item', {
                  select__item_small: size == 'small',
                })}
                onClick={() => {
                  handleSelect(option);
                }}
              >
                <span>{option.label}</span>
                {withStatus && optionIsStatus && (
                  <Status status={option.label} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
