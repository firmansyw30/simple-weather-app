import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  openweathermapApiKey: process.env.OPENWEATHERMAP_API_KEY || "",
  openweathermapBaseUrl: "https://api.openweathermap.org/data/2.5",
};
