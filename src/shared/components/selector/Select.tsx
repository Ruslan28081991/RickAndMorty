import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import './Select.css';

export interface IOption<T> {
  value: T;
  label: string;
}

interface ISelectOptionContent<T> {
  value?: T;
}

const DefaultSelectOptionContent = <T,>({ value }: ISelectOptionContent<T>) => {
  return <>{value}</>;
};

interface ISelect<T> {
  size?: 'medium' | 'small';
  value?: T;
  options?: IOption<T>[];
  placeholder?: string;
  onChange?: (value: T) => void;
  SelectOptionComponent?: React.FC<ISelectOptionContent<T>>;
}

export const Select = <T extends string>({
  size = 'medium',
  options = [],
  value,
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent,
}: ISelect<T>) => {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IOption<T> | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: IOption<T>) => {
    setSelectedOption(option);
    setIsOpenSelect(false);
    onChange?.(option.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpenSelect(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className='select'
      ref={selectRef}
    >
      <div
        className={cn('select__header', {
          select__header_small: size == 'small',
        })}
        onClick={() => setIsOpenSelect((open) => !open)}
      >
        {!selectedOption?.value && !value && <span>{placeholder}</span>}
        <div className='select__wrapper'>
          <SelectOptionComponent value={selectedOption?.value || value} />
        </div>

        <button
          className={cn('select__arrow', {
            select__arrow_small: size == 'small',
            select__arrow_opened: isOpenSelect,
          })}
          aria-label='Toggle select'
        />
      </div>

      {isOpenSelect && options.length && (
        <ul
          className={cn('select__list', {
            select__list_small: size == 'small',
          })}
        >
          {options.map((option) => {
            return (
              <li
                key={String(option.value)}
                className={cn('select__item', {
                  select__item_small: size == 'small',
                })}
                onClick={() => handleSelectOption(option)}
              >
                <SelectOptionComponent value={option.value} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
