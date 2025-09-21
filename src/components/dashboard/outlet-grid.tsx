'use client';

import type { Outlet } from '@/lib/types';
import { OutletCard } from './outlet-card';

interface OutletGridProps {
  outlets: Outlet[];
  onToggleIndividual: (id: number, isOn: boolean) => void;
  isOutletOnline: (outlet: Outlet) => boolean;
}

export function OutletGrid({ outlets, onToggleIndividual, isOutletOnline }: OutletGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {outlets.map((outlet) => (
        <OutletCard 
          key={outlet.id} 
          outlet={outlet}
          onToggle={() => onToggleIndividual(outlet.id, !outlet.isPoweredOn)}
          isOnline={isOutletOnline(outlet)}
        />
      ))}
    </div>
  );
}
