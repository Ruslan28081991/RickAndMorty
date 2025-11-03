import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { CloseIcon, ConfirmIcon, EditIcon } from '@/assets/icons';
import { Input, Select, Status, STATUS_OPTIONS, type TStatus } from '@/shared';

import './CharactersCard.css';

export interface ICharacters {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  status: TStatus;
  image: string;
}

export const CharactersCard = ({
  name,
  gender,
  species,
  location,
  status,
  image,
}: ICharacters) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string>(name);
  const [currentLocation, setCurrentLocation] = useState<string>(location.name);
  const [statusValue, setStatusValue] = useState<TStatus>(status!);

  const currentStatus = STATUS_OPTIONS.find(
    (option) => option.value === statusValue
  );

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleConfirm = () => {
    setIsEdit(false);
  };

  const handleCancel = () => {
    setCurrentName(name);
    setCurrentLocation(location.name);
    setStatusValue(status!);
    setIsEdit(false);
  };

  const handleNameChange = (value: string) => {
    setCurrentName(value);
  };

  const handleLocationChange = (value: string) => {
    setCurrentLocation(value);
  };

  const handleStatusChange = (value: TStatus) => {
    setStatusValue(value);
  };

  return (
    <div
      className={cn('characterCard', {
        characterCard_edited: isEdit,
      })}
    >
      <img
        className='characterCard__image'
        src={image}
        alt={`Picture ${name}`}
      />
      <div className='characterCard__info'>
        <div className='characterCard__wrapper'>
          {isEdit ? (
            <Input
              size='medium'
              value={currentName}
              onChange={handleNameChange}
            />
          ) : (
            <Link
              className='characterCard__name'
              to='/character'
            >
              {currentName}
            </Link>
          )}

          <div className='characterCard__actions'>
            {isEdit ? (
              <>
                <button
                  className='characterCard__button'
                  onClick={handleCancel}
                >
                  <CloseIcon aria-label='Cancel icon' />
                </button>
                <button
                  className='characterCard__button'
                  onClick={handleConfirm}
                >
                  <ConfirmIcon aria-label='Confirm icon' />
                </button>
              </>
            ) : (
              <button
                className='characterCard__button'
                onClick={handleEdit}
              >
                <EditIcon aria-label='Edit icon' />
              </button>
            )}
          </div>
        </div>
        <dl className='characterCard__list'>
          <dt className='characterCard__item'>Gender</dt>
          <dd className='characterCard__item-text'>{gender}</dd>

          <dt className='characterCard__item'>Species</dt>
          <dd className='characterCard__item-text'>{species}</dd>

          <dt className='characterCard__item'>Location</dt>
          <dd className='characterCard__item-text'>
            {isEdit ? (
              <Input
                size='small'
                value={currentLocation}
                onChange={handleLocationChange}
              />
            ) : (
              <span>{location.name}</span>
            )}
          </dd>

          <dt className='characterCard__item'>Status</dt>
          <dd className='characterCard__item-text'>
            {isEdit ? (
              <Select<TStatus>
                options={STATUS_OPTIONS}
                size='small'
                value={statusValue}
                onChange={handleStatusChange}
                SelectOptionComponent={({ option }) => (
                  <>
                    <span>{option?.label}</span>
                    <Status status={option?.value} />
                  </>
                )}
              />
            ) : (
              <>
                {currentStatus?.label}
                <Status status={statusValue} />
              </>
            )}
          </dd>
        </dl>
      </div>
    </div>
  );
};
