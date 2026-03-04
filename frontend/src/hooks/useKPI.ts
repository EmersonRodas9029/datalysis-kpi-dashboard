import { useQuery } from 'react-query';
import { apiClient } from '@/lib/api/client';
import { KPI, RevenueTrendPoint, TopProduct, FilterParams } from '@/types/kpi.types';

const fetchKPIs = async (params: FilterParams): Promise<KPI> => {
  const { data } = await apiClient.get('/kpis', { params });
  return data;
};

const fetchRevenueTrend = async (params: FilterParams & { grain: 'day' | 'week' | 'month' }): Promise<RevenueTrendPoint[]> => {
  const { data } = await apiClient.get('/trend/revenue', { params });
  return data;
};

const fetchTopProducts = async (params: FilterParams & { metric: 'gmv' | 'revenue'; limit: number }): Promise<TopProduct[]> => {
  const { data } = await apiClient.get('/rankings/products', { params });
  return data;
};

export const useKPIs = (params: FilterParams) => {
  return useQuery(['kpis', params], () => fetchKPIs(params), {
    enabled: !!params.from && !!params.to,
    retry: 1,
  });
};

export const useRevenueTrend = (params: FilterParams & { grain: 'day' | 'week' | 'month' }) => {
  return useQuery(['trend', params], () => fetchRevenueTrend(params), {
    enabled: !!params.from && !!params.to,
    retry: 1,
  });
};

export const useTopProducts = (params: FilterParams & { metric: 'gmv' | 'revenue'; limit: number }) => {
  return useQuery(['topProducts', params], () => fetchTopProducts(params), {
    enabled: !!params.from && !!params.to,
    retry: 1,
  });
};
