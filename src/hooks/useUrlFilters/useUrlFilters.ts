import { useCallback, useEffect, useState } from 'react';

interface IUrlFilters {
  name?: string;
  status?: string;
  gender?: string;
  species?: string;
}

export const useUrlFilters = () => {
  const [filters, setFilters] = useState<IUrlFilters>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const urlFilters: IUrlFilters = {};

    const name = params.get('name');
    const status = params.get('status');
    const gender = params.get('gender');
    const species = params.get('species');

    if (name !== null) urlFilters.name = name;
    if (status !== null) urlFilters.status = status;
    if (gender !== null) urlFilters.gender = gender;
    if (species !== null) urlFilters.species = species;

    setFilters(urlFilters);
  }, []);

  const updateUrl = useCallback((newFilters: IUrlFilters) => {
    const params = new URLSearchParams();

    if (newFilters.name) params.set('name', newFilters.name);
    if (newFilters.status) params.set('status', newFilters.status);
    if (newFilters.gender) params.set('gender', newFilters.gender);
    if (newFilters.species) params.set('species', newFilters.species);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);

    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname);
    setFilters({});
  }, []);

  return {
    filters,
    updateUrl,
    resetFilters,
    isHasFilters: Object.keys(filters).length > 0,
  };
};
