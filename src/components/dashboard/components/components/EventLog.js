export default function EventLog({ events }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">📜 Event Log</h2>
      <ul className="space-y-1">
        {events.length === 0 && <li>No events yet</li>}
        {events.map((e, i) => (
          <li key={i} className="text-sm text-gray-700">
            [{e.time}] {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
