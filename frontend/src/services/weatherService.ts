import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
const api = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api/weather` : "/api/weather",
});

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  humidity: number;
  description: string;
  icon: string;
}

export interface ForecastResponse {
  city: string;
  country: string;
  forecast: ForecastItem[];
}

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const { data } = await api.get("/current", { params: { city } });
  return data;
}

export async function fetchForecast(city: string): Promise<ForecastResponse> {
  const { data } = await api.get("/forecast", { params: { city } });
  return data;
}
