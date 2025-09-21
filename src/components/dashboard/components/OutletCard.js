export default function OutletCard({ outlet, toggleOutlet }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-semibold">{outlet.name}</h2>
      <p>Plugged: {outlet.plugged ? "✅ Yes" : "❌ No"}</p>
      <p>Status: {outlet.on ? "🟢 ON" : "🔴 OFF"}</p>

      <button
        onClick={() => toggleOutlet(outlet.id)}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
      >
        Toggle
      </button>
    </div>
  );
}
