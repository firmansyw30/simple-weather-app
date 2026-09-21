# Simple Weather Dashboard

A simple full-stack weather dashboard built with **TypeScript backend** (Express) and **Vite + React frontend**. Uses the [OpenWeatherMap API](https://openweathermap.org/api) for weather data.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express, TypeScript, Axios |
| Frontend | React 19, Vite 6, TypeScript, Tailwind CSS, Chart.js |
| API | OpenWeatherMap (free tier) |
| Secret Management | Infisical | 
| Container | Docker |
| Reverse Proxy | Nginx |

## Project Structure

```
simple-weather-app/
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Express entry point
│   │   ├── config/env.ts               # Environment config
│   │   ├── routes/weatherRoutes.ts     # API routes
│   │   └── controllers/weatherController.ts  # Weather logic
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── main.tsx                    # React entry
│   │   ├── App.tsx                     # Router
│   │   ├── pages/Dashboard.tsx         # Main dashboard
│   │   ├── components/
│   │   │   ├── SearchBar.tsx           # City search
│   │   │   ├── CurrentWeather.tsx      # Current weather card
│   │   │   └── ForecastChart.tsx       # 5-day forecast chart
│   │   ├── services/weatherService.ts  # API client
│   │   └── styles/globals.css          # Tailwind
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## Setup

### 1. Get API Key

Sign up at [OpenWeatherMap](https://openweathermap.org/api) and get a free API key.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENWEATHERMAP_API_KEY
npm install
npm run dev
```

Backend runs on `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/weather/current?city=Jakarta` | Current weather data |
| GET | `/api/weather/forecast?city=Jakarta` | 5-day / 3-hour forecast |
| GET | `/health` | Health check |

### Example Response

**GET /api/weather/current?city=Jakarta**

```json
{
  "city": "Jakarta",
  "country": "ID",
  "temp": 30.5,
  "feels_like": 33.2,
  "humidity": 75,
  "wind_speed": 3.6,
  "description": "partly cloudy",
  "icon": "02d"
}
```

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/city/Jakarta` |
| `/city/:name` | Weather dashboard for specified city |
