import { useState } from "react";
import ConnectForm from "./components/ConnectForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [selectedDb, setSelectedDb] = useState<string | null>(null);

  const handleConnected = async (defaultDb: string) => {
    setSelectedDb(defaultDb);
    console.log("defaultDb", defaultDb);
    setConnected(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      {!connected ? (
        <ConnectForm onConnected={handleConnected} />
      ) : (
        selectedDb && <Dashboard selectedDb={selectedDb} />
      )}
    </div>
  );
}
