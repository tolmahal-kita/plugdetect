"use client";
import { useState } from "react";
import OutletCard from "../components/OutletCard";
import EventLog from "../components/EventLog";

export default function Home() {
  const [outlets, setOutlets] = useState([
    { id: 1, name: "Outlet 1", plugged: false, on: false },
    { id: 2, name: "Outlet 2", plugged: false, on: false },
    { id: 3, name: "Outlet 3", plugged: false, on: false },
  ]);

  const [events, setEvents] = useState([]);

  const toggleOutlet = (id) => {
    setOutlets((prev) =>
      prev.map((outlet) =>
        outlet.id === id ? { ...outlet, on: !outlet.on } : outlet
      )
    );
    logEvent(`Toggled ${outlets.find((o) => o.id === id).name}`);
  };

  const toggleAll = () => {
    const allOn = outlets.every((o) => o.on);
    setOutlets((prev) => prev.map((o) => ({ ...o, on: !allOn })));
    logEvent(allOn ? "Turned OFF all outlets" : "Turned ON all outlets");
  };

  const logEvent = (msg) => {
    setEvents((prev) => [{ message: msg, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔌 PlugDetect Dashboard</h1>

      <button
        onClick={toggleAll}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
      >
        Toggle All Outlets
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {outlets.map((outlet) => (
          <OutletCard
            key={outlet.id}
            outlet={outlet}
            toggleOutlet={toggleOutlet}
          />
        ))}
      </div>

      <EventLog events={events} />
    </main>
  );
}
