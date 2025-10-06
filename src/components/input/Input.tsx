import cn from 'classnames'

import SearchIcon from '../../assets/images/search.svg?react';

import './Input.css';

interface IInput {
    view: 'filter' | 'form';
    size?: 'default' | 'small';
    name?: string; 
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void
}

export const Input = ({
    view,
    size,
    name,
    placeholder,
    value,
    onChange,
}: IInput) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={cn('input__wrapper', {
            input__wrapper_filter: view === 'filter',
            input__wrapper_form: view === 'form',
        })}>
              {view === 'filter' && <SearchIcon />}
              <input 
                  className={cn(`input__${size}`)}
                  type="text"
                  name={name}
                  placeholder={placeholder} 
                  value={value}
                  onChange={handleChange}
              /> 
        </div>
    )
}