import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { DateRangeFilter } from './DateRangeFilter';

interface GlobalFiltersProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (from: Date, to: Date) => void;
  orderStatus?: string[];
  onOrderStatusChange?: (status: string[]) => void;
  customerState?: string[];
  onCustomerStateChange?: (state: string[]) => void;
}

const orderStatusOptions = [
  'delivered',
  'shipped',
  'canceled',
  'unavailable',
  'invoiced',
  'processing',
];

const customerStateOptions = [
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'DF', 'GO', 'ES',
  'PE', 'CE', 'PA', 'MT', 'MA', 'MS', 'PB', 'PI', 'RN', 'AL',
  'SE', 'RO', 'TO', 'AC', 'AM', 'RR', 'AP',
];

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  dateRange,
  onDateRangeChange,
  orderStatus,
  onOrderStatusChange,
  customerState,
  onCustomerStateChange,
}) => {
  return (
    <div className="space-y-4">
      <DateRangeFilter
        from={dateRange.from}
        to={dateRange.to}
        onRangeChange={onDateRangeChange}
      />

      {onOrderStatusChange && (
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium">Estado de la orden</label>
            <select
              multiple
              value={orderStatus}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                onOrderStatusChange(values);
              }}
              className="w-full mt-1 px-3 py-2 border rounded-md h-32"
            >
              {orderStatusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}

      {onCustomerStateChange && (
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium">Estado del cliente</label>
            <select
              multiple
              value={customerState}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                onCustomerStateChange(values);
              }}
              className="w-full mt-1 px-3 py-2 border rounded-md h-32"
            >
              {customerStateOptions.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
