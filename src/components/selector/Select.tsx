import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import './Select.css';

export interface IOption {
  value: string;
  label: string;
}

interface ISelectOptionContent {
  value?: string;
}

const DefaultSelectOptionContent = ({ value }: ISelectOptionContent) => {
  return <>{value}</>;
};

interface ISelect {
  size?: 'default' | 'small';
  defaultValue?: string;
  options?: IOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  SelectOptionComponent?: React.FC<ISelectOptionContent>;
}

export const Select = ({
  size,
  options = [],
  defaultValue,
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent,
}: ISelect) => {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(() => {
    if (!defaultValue) return null;
    return options.find((option) => option.value === defaultValue) || null;
  });
  const selectRef = useRef<HTMLDivElement>(null);

  // if(!value) return null
  const handleSelectOption = (option: IOption) => {
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
    <div className='select'>
      <div
        className={cn('select__header', {
          select__header_small: size == 'small',
        })}
        onClick={() => setIsOpenSelect((open) => !open)}
        ref={selectRef}
      >
        {selectedOption ? (
          <SelectOptionComponent value={selectedOption.value} />
        ) : (
          <span>{placeholder}</span>
        )}
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
                key={option.value}
                className={cn('select__item', {
                  select__item_small: size == 'small',
                })}
                onClick={() => {
                  handleSelectOption(option);
                }}
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
