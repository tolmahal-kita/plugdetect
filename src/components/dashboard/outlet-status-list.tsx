"use client";

import type { Outlet } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { List, Power, Plug } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface OutletStatusListProps {
  outlets: Outlet[];
}

export function OutletStatusList({ outlets }: OutletStatusListProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <List className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Outlet Status</CardTitle>
        </div>
        <CardDescription>
          A summary of each outlet's current state.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {outlets.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No outlets to display status for.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {outlets.map((outlet, index) => (
              <div key={outlet.id}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{outlet.name}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={cn("flex items-center gap-1.5", outlet.isPoweredOn ? "text-primary" : "text-muted-foreground")}>
                      <Power className="h-4 w-4" />
                      {outlet.isPoweredOn ? "On" : "Off"}
                    </span>
                    <span className={cn("flex items-center gap-1.5", outlet.isDevicePlugged ? "text-foreground" : "text-muted-foreground")}>
                      <Plug className="h-4 w-4" />
                      {outlet.isDevicePlugged ? "Plugged" : "Unplugged"}
                    </span>
                  </div>
                </div>
                 {index < outlets.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
