import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastChart from "../components/ForecastChart";
import {
  fetchCurrentWeather,
  fetchForecast,
  type CurrentWeather as CurrentWeatherType,
  type ForecastItem,
} from "../services/weatherService";

export default function Dashboard() {
  const { city: urlCity } = useParams<{ city: string }>();
  const [current, setCurrent] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = async (city: string) => {
    setLoading(true);
    setError("");
    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrent(currentData);
      setForecast(forecastData.forecast);
    } catch {
      setError("City not found. Please try another city.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(urlCity || "Bandung");
  }, [urlCity]);

  const handleSearch = (city: string) => {
    window.location.href = `/city/${encodeURIComponent(city)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {current && !loading && <CurrentWeather data={current} />}
        {forecast.length > 0 && !loading && <ForecastChart data={forecast} />}
      </div>
    </div>
  );
}
