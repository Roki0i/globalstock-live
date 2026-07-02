import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT || 4000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({
    origin: CLIENT_ORIGIN,
}));
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
        updatedAt: new Date().toISOString(),
        data: [
            {
                symbol: "AAPL",
                name: "Apple Inc.",
                country: "USA",
                sector: "Technology",
                price: 175.3,
                previousClose: 173.3,
                change: 2.0,
                changePercent: 1.12,
                currency: "USD",
                volume: 143000000,
                history: [171, 172, 173, 172.5, 174, 175.3],
                updatedAt: new Date().toISOString(),
                source: "mock",
            },
            {
                symbol: "TSLA",
                name: "Tesla Inc.",
                country: "USA",
                sector: "Consumer",
                price: 248.2,
                previousClose: 249.3,
                change: -1.1,
                changePercent: -0.45,
                currency: "USD",
                volume: 12100000,
                history: [252, 251, 250, 249, 248.5, 248.2],
                updatedAt: new Date().toISOString(),
                source: "mock",
            },
        ],
    });
});
app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map