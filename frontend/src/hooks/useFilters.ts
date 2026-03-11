import { useState, useCallback } from 'react';
import { FilterParams } from '@/types/kpi.types';

const defaultFilters: FilterParams = {
  from: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // Enero 1 del año actual
  to: new Date().toISOString().split('T')[0], // Hoy
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);
  const [dateRange, setDateRange] = useState({
    from: new Date(defaultFilters.from),
    to: new Date(defaultFilters.to),
  });

  const updateDateRange = useCallback((from: Date, to: Date) => {
    setDateRange({ from, to });
    setFilters(prev => ({
      ...prev,
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
    }));
  }, []);

  const updateFilter = useCallback((key: keyof FilterParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      from: defaultFilters.from,
      to: defaultFilters.to,
    });
    setDateRange({
      from: new Date(defaultFilters.from),
      to: new Date(defaultFilters.to),
    });
  }, []);

  return {
    filters,
    dateRange,
    updateDateRange,
    updateFilter,
    clearFilters,
  };
};
