"use client";

import type { EventLog } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EventLogListProps {
  events: EventLog[];
}

export function EventLogList({ events }: EventLogListProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <History className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Event Log</CardTitle>
        </div>
        <CardDescription>
          A real-time log of all power and device events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full pr-4">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No events yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={event.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {event.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  {index < events.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
