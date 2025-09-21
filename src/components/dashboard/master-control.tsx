'use client';

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Power, Zap } from 'lucide-react';

interface MasterControlProps {
  isMasterOn: boolean;
  onToggleMaster: (isOn: boolean) => void;
  outletCount: number;
  activeDeviceCount: number;
}

export function MasterControl({ isMasterOn, onToggleMaster, outletCount, activeDeviceCount }: MasterControlProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
                <Power className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Power Control</CardTitle>
        </div>
        <CardDescription>
          Control power for all outlets. {activeDeviceCount} of {outletCount} outlets are currently active.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-4 rounded-lg border p-4 transition-colors" data-state={isMasterOn ? 'on' : 'off'}>
          <div className="space-y-0.5">
            <Label htmlFor="master-power-switch" className="text-base font-medium">
              All Outlets
            </Label>
            <p className="text-sm text-muted-foreground">
              Turn all outlets on or off.
            </p>
          </div>
          <Switch
            id="master-power-switch"
            checked={isMasterOn}
            onCheckedChange={onToggleMaster}
            aria-label="Toggle master power"
          />
        </div>
      </CardContent>
    </Card>
  );
}
