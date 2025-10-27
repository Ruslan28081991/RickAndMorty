import SearchIcon from '@/assets/images/search.svg?react';
import {
  GENDER_OPTIONS,
  Input,
  Select,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from '@/shared';

import './PanelFilters.css';

export interface ICharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: number;
}

export interface IPanelFilters {
  filters: ICharacterFilters;
  onChangeFilters: (newFilters: ICharacterFilters) => void;
}

export const PanelFilters = ({ filters, onChangeFilters }: IPanelFilters) => {
  const handleInputChange = (value: string) => {
    onChangeFilters({ ...filters, name: value });
  };

  const handleChangeSpecies = (value: string) => {
    onChangeFilters({ ...filters, species: value });
  };

  const handleChangeGender = (value: string) => {
    onChangeFilters({ ...filters, gender: value });
  };

  const handleChangeStatus = (value: string) => {
    onChangeFilters({ ...filters, status: value });
  };

  return (
    <div className='panel-filters'>
      <Input
        view='bordered'
        size='medium'
        placeholder='Filter by name...'
        value={filters.name || ''}
        onChange={handleInputChange}
        icon={SearchIcon}
      />
      <Select
        placeholder='Select species'
        options={SPECIES_OPTIONS}
        value={filters.species}
        onChange={handleChangeSpecies}
      />
      <Select
        placeholder='Select gender'
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={handleChangeGender}
      />
      <Select
        placeholder='Select status'
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={handleChangeStatus}
      />
    </div>
  );
};
