"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Outlet, EventLog } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { MasterControl } from './master-control';
import { OutletGrid } from './outlet-grid';
import { EventLogList } from './event-log';
import { OutletStatusList } from './outlet-status-list';
import { PowerOff, Power } from 'lucide-react';
import { app } from '@/lib/firebase';
import { getDatabase, ref, onValue, set } from 'firebase/database';

export function DashboardContainer() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [events, setEvents] = useState<EventLog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const db = getDatabase(app);
    const outletsRef = ref(db, 'outlets');

    const unsubscribe = onValue(outletsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const outletsArray: Outlet[] = Object.keys(data).map(key => ({
          id: parseInt(key, 10),
          name: data[key].name || `Outlet ${key}`,
          isPoweredOn: data[key].isPoweredOn ?? false,
          isDevicePlugged: data[key].isDevicePlugged ?? false,
          lastSeen: data[key].lastSeen ?? 0,
        }));
        setOutlets(outletsArray);
      } else {
        setOutlets([]);
      }
    }, (error) => {
        console.error("Firebase read failed: " + error.message);
        setOutlets([]);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not connect to the database.",
        });
    });

    return () => unsubscribe();
  }, [toast]);

  const isMasterOn = useMemo(() => outlets.some(o => o.isPoweredOn), [outlets]);
  const activeDeviceCount = useMemo(() => outlets.filter(o => o.isPoweredOn && o.isDevicePlugged).length, [outlets]);

  const isOutletOnline = (outlet: Outlet) => {
    const THRESHOLD_MS = 60 * 1000; // e.g. offline if no update for 60 seconds
    if (!outlet.lastSeen) return false;
    return Date.now() - outlet.lastSeen < THRESHOLD_MS;
  };

  const addEvent = (message: string) => {
    setEvents(prevEvents => [
      { id: Date.now(), timestamp: new Date(), message },
      ...prevEvents,
    ]);
  };

  const handleMasterPowerToggle = (isOn: boolean) => {
    if (outlets.length === 0) {
      toast({
          variant: "destructive",
          title: "No Outlets Found",
          description: "Cannot toggle power, no outlets are connected.",
      });
      return;
    }
    const db = getDatabase(app);
    const updates: Promise<void>[] = [];

    outlets.forEach(outlet => {
      const outletRef = ref(db, `outlets/${outlet.id}/isPoweredOn`);
      updates.push(set(outletRef, isOn));
    });

    Promise.all(updates).then(() => {
      const message = `Master power turned ${isOn ? 'ON' : 'OFF'}.`;
      addEvent(message);

      toast({
          title: isOn ? "Power Restored" : "Power Off",
          description: `All outlets have been turned ${isOn ? 'on' : 'off'}.`,
          icon: isOn ? <Power className="h-5 w-5 text-green-500" /> : <PowerOff className="h-5 w-5 text-red-500" />,
      });
    }).catch(error => {
        console.error("Failed to update master power state: ", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not update power state. Please try again.",
        });
    });
  };

  const toggleIndividualOutlet = (outletId: number, isOn: boolean) => {
    const db = getDatabase(app);
    const outletRef = ref(db, `outlets/${outletId}/isPoweredOn`);
    set(outletRef, isOn)
      .then(() => {
        const message = `Outlet ${outletId} turned ${isOn ? 'ON' : 'OFF'}.`;
        addEvent(message);
      })
      .catch((err) => {
        console.error('Error toggling outlet: ', err);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: `Could not toggle outlet ${outletId}.`,
        });
      });
  };
  
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-start-2 lg:col-span-1 grid auto-rows-max items-start gap-4 md:gap-8">
          <MasterControl 
            isMasterOn={isMasterOn}
            onToggleMaster={handleMasterPowerToggle}
            outletCount={outlets.length}
            activeDeviceCount={activeDeviceCount}
          />
          <EventLogList events={events} />
          <OutletStatusList outlets={outlets} />
        </div>
      </div>
      <div className="mt-4 md:mt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Outlet Monitors
        </h2>
        <OutletGrid outlets={outlets} onToggleIndividual={toggleIndividualOutlet} isOutletOnline={isOutletOnline} />
        {outlets.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            <p>No outlets found.</p>
            <p className="text-sm">The dashboard is waiting for connection. Once the ESP32 reports in, outlets will appear here.</p>
          </div>
        )}
      </div>
    </>
  );
}
