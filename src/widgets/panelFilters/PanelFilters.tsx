import SearchIcon from '../../assets/images/search.svg?react';
import { Input } from '../../components/input/Input';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from '../../components/options/Options';
import { Select } from '../../components/selector/Select';

import './PanelFilters.css';

export interface ICharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: number;
}

interface IPanelFilters {
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
        placeholder='Species'
        options={SPECIES_OPTIONS}
        value={filters.species}
        onChange={handleChangeSpecies}
      />
      <Select
        placeholder='Gender'
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={handleChangeGender}
      />
      <Select
        placeholder='Status'
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={handleChangeStatus}
      />
    </div>
  );
};
