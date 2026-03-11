import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface DateRangeFilterProps {
  from: Date;
  to: Date;
  onRangeChange: (from: Date, to: Date) => void;
}

const presets = [
  { label: 'Últimos 7 días', days: 7 },
  { label: 'Últimos 30 días', days: 30 },
  { label: 'Últimos 90 días', days: 90 },
  { label: 'Este año', days: 365 },
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  from,
  to,
  onRangeChange,
}) => {
  const handlePresetClick = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    onRangeChange(from, to);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Rango de fechas</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <label className="text-xs text-muted-foreground">Desde</label>
                <input
                  type="date"
                  value={from.toISOString().split('T')[0]}
                  onChange={(e) => onRangeChange(new Date(e.target.value), to)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Hasta</label>
                <input
                  type="date"
                  value={to.toISOString().split('T')[0]}
                  onChange={(e) => onRangeChange(from, new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Presets</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetClick(preset.days)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
