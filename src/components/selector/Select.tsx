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
  value?: string;
  options?: IOption[];
  placeholder?: string;
  withStatus?: boolean;
  onChange?: (value: string) => void;
  SelectOptionComponent?: React.FC<ISelectOptionContent>;
}

export const Select = ({
  size,
  options = [],
  value,
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent,
}: ISelect) => {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: IOption) => {
    setSelectedOption(option);
    setIsOpenSelect(false);
    onChange?.(option.value);
  };

  useEffect(() => {
    if (!value) {
      setSelectedOption(null);
      return;
    }

    const findValue = options?.find((option) => option.value === value) || null;
    setSelectedOption(findValue);
  }, [value, options]);

  return (
    <div className='select'>
      <div
        className={cn('select__header', `select__header_${size}`, {})}
        onClick={() => setIsOpenSelect((open) => !open)}
        ref={selectRef}
      >
        {selectedOption ? (
          <SelectOptionComponent value={selectedOption.value} />
        ) : (
          <span>{placeholder}</span>
        )}
        <button
          className={cn('select__arrow', `select__arrow_${size}`, {
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
