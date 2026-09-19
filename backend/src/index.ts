import express from "express";
import cors from "cors";
import { config } from "./config/env";
import weatherRoutes from "./routes/weatherRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/weather", weatherRoutes);

// For local testing
// app.listen(config.port, () => {
//   console.log(`Backend running on http://localhost:${config.port}`);
// });

// For Docker deployment
app.listen(config.port, "0.0.0.0", () => {
  console.log(`Backend running on http://0.0.0.0:${config.port}`);
});
