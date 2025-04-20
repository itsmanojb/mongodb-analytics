import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppContext } from "../hooks/appContext";
import DatabaseList from "./DatabaseList";

export interface CollectionStats {
  name: string;
  size: number;
  count: number;
}

export interface DBStats {
  dbStats: any;
  collections: CollectionStats[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
    },
  },
};

export default function Dashboard() {
  const {
    state: { databases, selectedDb, connectionName, connectionUri },
    dispatch,
  } = useAppContext();
  const [stats, setStats] = useState<DBStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await window.api.getDBStats(selectedDb!);
      setStats(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [selectedDb]);

  if (!stats)
    return (
      <div className="h-screen grid place-content-center">
        Loading statistics...
      </div>
    );

  const chartDataSize = {
    labels: stats.collections.map((c) => c.name),
    datasets: [
      {
        label: "Collection Size (KB)",
        data: stats.collections.map((c) => c.size / 1024),
        backgroundColor: "#016630",
        borderRadius: 0,
        stack: "Stack 0",
      },
    ],
  };

  const chartDataCount = {
    labels: stats.collections.map((c) => c.name),
    datasets: [
      {
        label: "Documents",
        data: stats.collections.map((c) => c.count),
        backgroundColor: "rgb(75, 192, 192)",
        borderRadius: 0,
        stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="flex h-full">
      <aside className="min-w-[240px] w-1/5 border-r border-gray-50 dark:border-neutral-700 overflow-auto shrink-0">
        <div className="bg-green-800 text-white p-6">
          <h2 className="font-semibold text-lg">
            {connectionName?.split(":")[0]}
          </h2>
          <p className="text-xs truncate">{connectionUri}</p>
        </div>

        {selectedDb && (
          <DatabaseList
            databases={databases}
            selectedDb={selectedDb}
            stats={stats}
            onDBChange={(db) =>
              dispatch({ type: "SET_SELECTED_DB", payload: db })
            }
          />
        )}
      </aside>
      <main className="overflow-x-auto grow">
        <div className="flex p-6 items-center justify-between">
          <h2 className="text-xl font-semibold">Database [{selectedDb}]</h2>
          <button
            onClick={() => window.api.exportStats(stats)}
            className="btn-primary">
            Export
          </button>
        </div>
        <section className="p-6 space-y-10">
          <div className="px-10">
            <Bar
              options={{
                ...options,
                indexAxis: "y",
              }}
              data={chartDataSize}
            />
          </div>
          <div className="px-10">
            <Bar
              options={{
                ...options,
                indexAxis: "y",
              }}
              data={chartDataCount}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
