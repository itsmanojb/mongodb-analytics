import { useState } from "react";

interface Props {
  onConnected: (defaultDb: string) => void;
}

export default function ConnectForm({ onConnected }: Props) {
  const [uri, setUri] = useState("mongodb://localhost:27017");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const databases = await window.api.connect({ uri });
      const defaultDb = databases[0]?.name || "";
      onConnected(defaultDb);
    } catch (err) {
      console.error("Connection failed:", err);
      setError("Failed to connect. Please check your URI and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Connect to MongoDB</h1>
      <input
        type="text"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        placeholder="Enter MongoDB URI"
        className="border p-2 w-full rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleConnect}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {loading ? "Connecting..." : "Connect"}
      </button>
    </div>
  );
}
