import type { CurrentWeather } from "../services/weatherService";

interface Props {
  data: CurrentWeather;
}

export default function CurrentWeather({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {data.city}, {data.country}
          </h2>
          <p className="text-gray-500 capitalize">{data.description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="w-20 h-20"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="text-2xl font-semibold">{Math.round(data.temp)}°C</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Feels Like</p>
          <p className="text-2xl font-semibold">{Math.round(data.feels_like)}°C</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-2xl font-semibold">{data.humidity}%</p>
        </div>
      </div>

      <div className="mt-3 bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">Wind Speed</p>
        <p className="text-lg font-semibold">{data.wind_speed} m/s</p>
      </div>
    </div>
  );
}
