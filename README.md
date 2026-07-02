# GlobalStock Live

GlobalStock Live is a real-time stock dashboard built with Vite, React, TypeScript, Tailwind CSS, and Express.

## Features

- Dark financial dashboard UI
- Mock stock data from `GET /api/stocks`
- Search by symbol, name, country, and sector
- Auto refresh every 5 seconds
- Auto refresh ON/OFF control and manual refresh
- Green for gains and red for losses
- API error banner while preserving the latest successful data
- Frontend API access isolated in `client/src/services/stocksApi.ts`

## Run Locally

Start the API server:

```bash
cd server
npm run dev
```

Start the client:

```bash
cd client
npm run dev
```

Default endpoints:

- Client: `http://localhost:5173`
- Server: `http://localhost:4000`
- Health: `http://localhost:4000/api/health`
- Stocks: `http://localhost:4000/api/stocks`

If port `5173` is already in use, Vite will choose the next available port.

## API Configuration

The client uses `http://localhost:4000` by default. Override it with:

```bash
VITE_API_BASE_URL=http://localhost:4000 npm run dev
```

Do not put API keys in the frontend. For a future Finnhub integration, keep API keys and upstream requests inside the Express server, then continue returning normalized stock data from `/api/stocks`.

## Project Structure

- `client/src/App.tsx`: dashboard state, search, refresh, and error handling
- `client/src/components/`: dashboard UI components
- `client/src/services/stocksApi.ts`: stock API client
- `client/src/types/stock.ts`: shared stock data types
- `server/src/index.ts`: Express API server with mock stock data
