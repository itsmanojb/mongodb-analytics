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

interface CollectionStats {
  name: string;
  size: number;
  count: number;
}

interface DBStats {
  dbStats: any;
  collections: CollectionStats[];
}

interface Props {
  selectedDb: string;
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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function Dashboard({ selectedDb }: Props) {
  const [stats, setStats] = useState<DBStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await window.api.getDBStats(selectedDb);
      console.log("data", data);
      setStats(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [selectedDb]);

  if (!stats) return <div>Loading dashboard...</div>;

  const chartData = {
    labels: stats.collections.map((c) => c.name),
    datasets: [
      {
        label: "Collection Size (Bytes)",
        data: stats.collections.map((c) => c.size),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-xl font-semibold">Dashboard - {selectedDb}</h2>
      <Bar options={options} data={chartData} />
      <button
        onClick={() => window.api.exportStats(stats)}
        className="btn-primary">
        Export Stats
      </button>
    </div>
  );
}
