import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config/env";

export async function getCurrentWeather(req: Request, res: Response) {
  const { city } = req.query;
  if (!city || typeof city !== "string") {
    return res.status(400).json({ error: "city query parameter is required" });
  }

  try {
    const response = await axios.get(`${config.openweathermapBaseUrl}/weather`, {
      params: {
        q: city,
        appid: config.openweathermapApiKey,
        units: "metric",
      },
    });

    const data = response.data;
    res.json({
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }
    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}

export async function getForecast(req: Request, res: Response) {
  const { city } = req.query;
  if (!city || typeof city !== "string") {
    return res.status(400).json({ error: "city query parameter is required" });
  }

  try {
    const response = await axios.get(`${config.openweathermapBaseUrl}/forecast`, {
      params: {
        q: city,
        appid: config.openweathermapApiKey,
        units: "metric",
      },
    });

    const data = response.data;
    const forecast = data.list.map((item: any) => ({
      dt: item.dt,
      temp: item.main.temp,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

    res.json({
      city: data.city.name,
      country: data.city.country,
      forecast,
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }
    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
}
