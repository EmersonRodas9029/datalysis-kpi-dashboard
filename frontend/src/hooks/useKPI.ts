import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { KPI, RevenueTrendPoint, TopProduct, FilterParams } from '@/types/kpi.types';

// Función para construir query params correctamente
const buildQueryParams = (params: Record<string, any>) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item) queryParams.append(key, item);
        });
      } else {
        queryParams.append(key, value.toString());
      }
    }
  });
  
  return queryParams;
};

const fetchKPIs = async (params: FilterParams): Promise<KPI> => {
  const queryParams = buildQueryParams(params);
  console.log('🔍 Fetching KPIs with params:', queryParams.toString());
  
  const { data } = await apiClient.get(`/kpis?${queryParams.toString()}`);
  return data;
};

const fetchRevenueTrend = async (params: FilterParams & { grain: 'day' | 'week' | 'month' }): Promise<RevenueTrendPoint[]> => {
  const queryParams = buildQueryParams(params);
  console.log('🔍 Fetching Revenue Trend with params:', queryParams.toString());
  
  const { data } = await apiClient.get(`/trend/revenue?${queryParams.toString()}`);
  return data;
};

const fetchTopProducts = async (params: FilterParams & { metric: 'gmv' | 'revenue'; limit: number }): Promise<TopProduct[]> => {
  const queryParams = buildQueryParams(params);
  console.log('🔍 Fetching Top Products with params:', queryParams.toString());
  
  const { data } = await apiClient.get(`/rankings/products?${queryParams.toString()}`);
  return data;
};

export const useKPIs = (params: FilterParams) => {
  return useQuery({
    queryKey: ['kpis', params],
    queryFn: () => fetchKPIs(params),
    enabled: !!params.from && !!params.to,
    retry: 1,
  });
};

export const useRevenueTrend = (params: FilterParams & { grain: 'day' | 'week' | 'month' }) => {
  return useQuery({
    queryKey: ['trend', params],
    queryFn: () => fetchRevenueTrend(params),
    enabled: !!params.from && !!params.to,
    retry: 1,
  });
};

export const useTopProducts = (params: FilterParams & { metric: 'gmv' | 'revenue'; limit: number }) => {
  return useQuery({
    queryKey: ['topProducts', params],
    queryFn: () => fetchTopProducts(params),
    enabled: !!params.from && !!params.to,
    retry: 1,
  });
};