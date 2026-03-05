import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DateRangeFilter } from './DateRangeFilter';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface GlobalFiltersProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (from: Date, to: Date) => void;
  filters?: {
    orderStatus?: string[];
    productCategory?: string[];
    customerState?: string[];
  };
  onFilterChange?: (key: string, values: string[]) => void;
  onClearFilters?: () => void;
}

const orderStatusOptions = [
  { value: 'delivered', label: 'Entregado', color: 'green' },
  { value: 'shipped', label: 'Enviado', color: 'blue' },
  { value: 'canceled', label: 'Cancelado', color: 'red' },
  { value: 'unavailable', label: 'No disponible', color: 'gray' },
  { value: 'invoiced', label: 'Facturado', color: 'purple' },
  { value: 'processing', label: 'Procesando', color: 'yellow' },
  { value: 'created', label: 'Creado', color: 'gray' },
  { value: 'approved', label: 'Aprobado', color: 'green' },
];

const productCategoryOptions = [
  'health_beauty',
  'computers_accessories',
  'baby',
  'furniture_decor',
  'watches_gifts',
  'musical_instruments',
  'sports_leisure',
  'housewares',
  'garden_tools',
  'toys',
  'food_drink',
  'books_general',
  'auto',
  'construction_tools',
  'stationery',
  'pet_shop',
  'telephony',
  'perfumery',
  'electronics',
  'office_furniture',
];

const customerStateOptions = [
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'DF', 'GO', 'ES',
  'PE', 'CE', 'PA', 'MT', 'MA', 'MS', 'PB', 'PI', 'RN', 'AL',
  'SE', 'RO', 'TO', 'AC', 'AM', 'RR', 'AP',
];

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  dateRange,
  onDateRangeChange,
  filters = {},
  onFilterChange,
  onClearFilters,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('date');
  const [localFilters, setLocalFilters] = useState({
    orderStatus: filters.orderStatus || [],
    productCategory: filters.productCategory || [],
    customerState: filters.customerState || [],
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleFilterChange = (key: string, value: string) => {
    const currentValues = localFilters[key as keyof typeof localFilters] as string[];
    let newValues: string[];
    
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    setLocalFilters(prev => ({ ...prev, [key]: newValues }));
    
    if (onFilterChange) {
      onFilterChange(key, newValues);
    }
  };

  const clearAllFilters = () => {
    setLocalFilters({
      orderStatus: [],
      productCategory: [],
      customerState: [],
    });
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const activeFiltersCount = 
    localFilters.orderStatus.length + 
    localFilters.productCategory.length + 
    localFilters.customerState.length;

  return (
    <Card className="glass-card sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Filtros</h3>
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Limpiar ({activeFiltersCount})
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Fecha - siempre visible */}
          <div>
            <button
              onClick={() => toggleSection('date')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium">Rango de fechas</span>
              {expandedSection === 'date' ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSection === 'date' && (
              <div className="mt-3">
                <DateRangeFilter
                  from={dateRange.from}
                  to={dateRange.to}
                  onRangeChange={onDateRangeChange}
                />
              </div>
            )}
          </div>

          {/* Estado de orden */}
          <div className="border-t pt-3">
            <button
              onClick={() => toggleSection('status')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium">Estado de orden</span>
              {expandedSection === 'status' ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSection === 'status' && (
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {orderStatusOptions.map((status) => (
                  <label
                    key={status.value}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={localFilters.orderStatus.includes(status.value)}
                      onChange={() => handleFilterChange('orderStatus', status.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="flex-1 text-sm capitalize">{status.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${status.color}-100 text-${status.color}-700`}>
                      {status.value}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Categoría de producto */}
          <div className="border-t pt-3">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium">Categoría</span>
              {expandedSection === 'category' ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSection === 'category' && (
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {productCategoryOptions.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={localFilters.productCategory.includes(category)}
                      onChange={() => handleFilterChange('productCategory', category)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="flex-1 text-sm capitalize">{category.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Estado del cliente */}
          <div className="border-t pt-3">
            <button
              onClick={() => toggleSection('state')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-medium">Estado del cliente</span>
              {expandedSection === 'state' ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedSection === 'state' && (
              <div className="mt-3 grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                {customerStateOptions.map((state) => (
                  <label
                    key={state}
                    className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={localFilters.customerState.includes(state)}
                      onChange={() => handleFilterChange('customerState', state)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{state}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resumen de filtros activos */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Filtros activos:</p>
            <div className="flex flex-wrap gap-1">
              {localFilters.orderStatus.map(status => (
                <span key={status} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {status}
                </span>
              ))}
              {localFilters.productCategory.map(cat => (
                <span key={cat} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {cat.split('_')[0]}...
                </span>
              ))}
              {localFilters.customerState.map(state => (
                <span key={state} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {state}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
