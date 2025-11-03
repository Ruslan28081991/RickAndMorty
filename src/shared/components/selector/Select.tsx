import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import {
  ArrowDownIcon,
  ArrowDownSmallIcon,
  ArrowUpIcon,
  ArrowUpSmallIcon,
} from '@/assets/icons';

import './Select.css';

export interface IOption<T> {
  value: T;
  label: string;
}

interface ISelectOptionContent<T> {
  option?: IOption<T>;
}

const DefaultSelectOptionContent = <T,>({
  option,
}: ISelectOptionContent<T>) => {
  return <>{option?.label}</>;
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
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || undefined;

  const handleSelectOption = (option: IOption<T>) => {
    setIsOpenSelect(false);
    onChange?.(option.value);
  };

  const getArrowIcon = () => {
    if (size === 'small') {
      return isOpenSelect ? <ArrowUpSmallIcon /> : <ArrowDownSmallIcon />;
    } else {
      return isOpenSelect ? <ArrowUpIcon /> : <ArrowDownIcon />;
    }
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
        {!selectedOption && placeholder ? (
          <span>{placeholder}</span>
        ) : (
          <div className='select__content'>
            <SelectOptionComponent option={selectedOption} />
          </div>
        )}
        <button
          className={cn('select__arrow', {
            select__arrow_small: size == 'small',
          })}
          aria-label='Toggle select'
        >
          {getArrowIcon()}
        </button>
      </div>

      {isOpenSelect && options.length && (
        <ul className='select__list'>
          {options.map((option) => {
            return (
              <li
                key={option.value}
                className={cn('select__item', {
                  select__item_small: size == 'small',
                })}
                onClick={() => handleSelectOption(option)}
              >
                <SelectOptionComponent option={option} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
