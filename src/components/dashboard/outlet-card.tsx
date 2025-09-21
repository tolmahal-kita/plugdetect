'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { OutletIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { Outlet } from '@/lib/types';
import { Zap, ZapOff, Plug, PlugZap, Wifi, WifiOff } from 'lucide-react';

interface OutletCardProps {
  outlet: Outlet;
  onToggle: (isOn: boolean) => void;
  isOnline: boolean;
}

export function OutletCard({ outlet, onToggle, isOnline }: OutletCardProps) {
  const status = outlet.isPoweredOn ? (outlet.isDevicePlugged ? 'active' : 'standby') : 'off';

  const statusConfig = {
    active: {
      label: "Active",
      borderColor: "border-primary",
      shadow: "shadow-lg shadow-primary/20",
      icon: <Zap className="h-4 w-4 text-primary" />,
      deviceIcon: <PlugZap className="h-4 w-4 text-primary" />
    },
    standby: {
      label: "Standby",
      borderColor: "border-accent",
      shadow: "shadow-md shadow-accent/20",
      icon: <Zap className="h-4 w-4 text-accent" />,
      deviceIcon: <Plug className="h-4 w-4" />
    },
    off: {
      label: "Off",
      borderColor: "border-muted-foreground/20",
      shadow: "",
      icon: <ZapOff className="h-4 w-4 text-muted-foreground" />,
      deviceIcon: <Plug className="h-4 w-4 text-muted-foreground" />
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <Card className={cn("transition-all duration-300 flex flex-col h-full", currentStatus.borderColor, currentStatus.shadow)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <OutletIcon className={cn(status === 'off' ? "text-muted-foreground" : status === 'active' ? "text-primary" : "text-accent")} />
            <CardTitle>{outlet.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
        <CardDescription>
          {outlet.isDevicePlugged ? 'Device is plugged in' : 'No device plugged in'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            {currentStatus.icon}
            <span>Power: <span className={cn(status === 'off' ? "text-muted-foreground" : "font-medium")}>{outlet.isPoweredOn ? "On" : "Off"}</span></span>
          </div>
          <div className="flex items-center gap-2">
            {currentStatus.deviceIcon}
            <span>Device: <span className={cn(status === 'off' ? "text-muted-foreground" : "font-medium")}>{outlet.isDevicePlugged ? "Plugged In" : "Unplugged"}</span></span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
         <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">Toggle Power</span>
            <Switch
                checked={outlet.isPoweredOn}
                onCheckedChange={onToggle}
                aria-label={`Toggle power for ${outlet.name}`}
                disabled={!isOnline}
            />
        </div>
      </CardFooter>
    </Card>
  );
}
