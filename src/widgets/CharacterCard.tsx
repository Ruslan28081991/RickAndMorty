import { useState } from 'react';

import Rick from '../assets/images/rick.jpg';
import { Input } from '../components/input/Input';
import { STATUS_OPTIONS } from '../components/options/Options';
import { Select } from '../components/selector/Select';
import { Status, type TStatus } from '../components/status/Status';

import './CharacterCard.css';

export interface ICharacter {
  name: string;
  gender: string;
  species: string;
  location: string;
  status?: TStatus;
}

interface ICharacterCard {
  character: ICharacter;
  onEditCharacter?: (field: string, newValue: string) => void;
}

interface IViewMode {
  field: string;
  value: string;
  isName?: boolean;
}

export const CharacterCard = ({
  character,
  onEditCharacter,
}: ICharacterCard) => {
  const [tempValue, setTempValue] = useState<string>('');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [isStatusOpen, setIsStausOpen] = useState<boolean>(false);

  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
    setHoveredField(null);
  };

  const saveEdit = () => {
    if (editingField && onEditCharacter) {
      onEditCharacter(editingField, tempValue);
    }
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  const toggleStatusSelect = () => {
    setIsStausOpen((open) => !open);
  };

  const EditMode = () => (
    <div className='character-card__edit-mode'>
      <Input
        view='underlined'
        value={tempValue}
        onChange={(value) => setTempValue(value)}
        autoFocus
      />
      <div className='character-card__actions'>
        <button
          className='character-card__close-btn'
          onClick={cancelEdit}
        />
        <button
          className='character-card__save-btn'
          onClick={saveEdit}
        />
      </div>
    </div>
  );

  const ViewMode = ({ field, value, isName = false }: IViewMode) => (
    <div
      className={'character-card__view-mode'}
      onMouseEnter={() => setHoveredField(field)}
      onMouseLeave={() => setHoveredField(null)}
    >
      {isName ? (
        <a
          className='character-card__name'
          href='/'
        >
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}

      {hoveredField === field && (
        <div className='character-card__actions'>
          <button
            className='character-card__edit-btn'
            onClick={() => startEditing(field, value)}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className='character-card'>
      <div className='character-card__image'>
        <img
          className='character-card__image-character'
          src={Rick}
          alt={`Picture ${character.name}`}
        />
      </div>
      <div className='character-card__info'>
        {editingField === 'name' ? (
          <EditMode />
        ) : (
          <ViewMode
            field='name'
            value={character.name}
            isName={true}
          />
        )}

        <dl className='character-card__list'>
          <dt className='character-card__item'> Gender </dt>
          <dd className='character-card__item-text'>
            {editingField === 'gender' ? (
              <EditMode />
            ) : (
              <ViewMode
                field='gender'
                value={character.gender}
              />
            )}
          </dd>

          <dt className='character-card__item'> Species </dt>
          <dd className='character-card__item-text'>
            {editingField === 'species' ? (
              <EditMode />
            ) : (
              <ViewMode
                field='species'
                value={character.species}
              />
            )}
          </dd>

          <dt className='character-card__item'> Location </dt>
          <dd className='character-card__item-text'>
            {editingField === 'location' ? (
              <EditMode />
            ) : (
              <ViewMode
                field='location'
                value={character.location}
              />
            )}
          </dd>

          <dt className='character-card__item'> Status </dt>
          <dd className='character-card__item-text'>
            <div
              className='character-card__status'
              onMouseEnter={() => setHoveredField('status')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <div className='character-card__status-current'>
                {!isStatusOpen && (
                  <>
                    <div className='character-card__status-wrapper'>
                      <span>{character.status}</span>
                      <Status status={character.status} />
                    </div>

                    {hoveredField === 'status' && (
                      <button
                        className='character-card__edit-btn'
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatusSelect();
                        }}
                      />
                    )}
                  </>
                )}

                {isStatusOpen && (
                  <div className='character-card__select-wrapper'>
                    <Select
                      options={STATUS_OPTIONS}
                      size='small'
                      value={character.status}
                      onChange={(newStatus) => {
                        onEditCharacter?.('status', newStatus);
                        setIsStausOpen(false);
                      }}
                      SelectOptionComponent={({ value }) => (
                        <>
                          <span>{value}</span>
                          <Status status={value} />
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
};
