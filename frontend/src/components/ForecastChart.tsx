import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ForecastItem } from "../services/weatherService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
  data: ForecastItem[];
}

export default function ForecastChart({ data }: Props) {
  const labels = data.map((item) => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" });
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.temp),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { title: { display: true, text: "°C" } },
      x: {
        ticks: { maxTicksLimit: 10 },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
