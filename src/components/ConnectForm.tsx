import { useState } from "react";
import DatabaseList from "./DatabaseList";

export interface Database {
  name: string;
  sizeOnDisk: number;
  empty: boolean;
}

interface Props {
  onConnected: (defaultDb: string) => void;
}

export default function ConnectForm({ onConnected }: Props) {
  const [uri, setUri] = useState("localhost:27017");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [databases, setDatabases] = useState<Database[]>([]);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const databases = (await window.api.connect({
        uri: "mongodb://" + uri,
      })) as Database[];
      setDatabases(databases);
    } catch (err) {
      console.error("Connection failed:", err);
      setError("Failed to connect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-full p-4 place-content-center mx-auto">
      {databases.length === 0 ? (
        <div className="space-y-2 w-96">
          <div>
            <label
              htmlFor="mongouri-input"
              className="block text-sm/6 font-medium text-gray-800">
              Connect to MongoDB
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 border border-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600">
                <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                  mongodb://
                </div>
                <input
                  id="mongouri-input"
                  type="text"
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                  placeholder="Enter MongoDB URI"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-1">
                  <h3 className="text-sm font-medium text-red-800">
                    Failed to connect
                  </h3>
                  <div className="my-1 text-sm text-red-700">
                    <ul role="list" className="list-disc space-y-1 pl-5">
                      <li>Please check your URI and try again.</li>
                      <li>Make sure MongoDB is running.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleConnect}
            disabled={loading}
            className="btn-primary">
            {loading ? "Connecting..." : "Connect"}
          </button>
        </div>
      ) : (
        <DatabaseList items={databases} onItemClick={(db) => onConnected(db)} />
      )}
    </div>
  );
}
