export type Outlet = {
  id: number;
  name: string;
  isPoweredOn: boolean;
  isDevicePlugged: boolean;
  lastSeen?: number;
  device?: {
    name: string;
    wattage: number;
  };
};

export type EventLog = {
  id: number;
  timestamp: Date;
  message: string;
};
