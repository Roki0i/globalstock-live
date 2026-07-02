import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mockIndices } from "./data/mockIndices.js";
import { mockStocks } from "./data/mockStocks.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.SERVER_PORT || 4000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const ALLOWED_ORIGINS = [CLIENT_ORIGIN, "http://localhost:5174"];
const MOCK_UPDATED_AT = "2026-07-02T11:00:00.000Z";

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "globalstock-live-server",
    time: new Date().toISOString(),
  });
});

app.get("/api/stocks", (_req, res) => {
  res.json({
    source: "mock",
    updatedAt: MOCK_UPDATED_AT,
    data: mockStocks,
  });
});

app.get("/api/stocks/top-gainers", (_req, res) => {
  const topGainers = [...mockStocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);

  res.json({
    source: "mock",
    updatedAt: MOCK_UPDATED_AT,
    data: topGainers,
  });
});

app.get("/api/sectors", (_req, res) => {
  const sectorMap = mockStocks.reduce<
    Record<string, { sector: string; count: number; totalChangePercent: number }>
  >((accumulator, stock) => {
    const current = accumulator[stock.sector] ?? {
      sector: stock.sector,
      count: 0,
      totalChangePercent: 0,
    };

    accumulator[stock.sector] = {
      sector: stock.sector,
      count: current.count + 1,
      totalChangePercent: current.totalChangePercent + stock.changePercent,
    };

    return accumulator;
  }, {});

  const sectors = Object.values(sectorMap).map((sector) => ({
    sector: sector.sector,
    count: sector.count,
    averageChangePercent: Number(
      (sector.totalChangePercent / sector.count).toFixed(2)
    ),
  }));

  res.json({
    source: "mock",
    updatedAt: MOCK_UPDATED_AT,
    data: sectors,
  });
});

app.get("/api/indices", (_req, res) => {
  res.json({
    source: "mock",
    updatedAt: MOCK_UPDATED_AT,
    data: mockIndices,
  });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
