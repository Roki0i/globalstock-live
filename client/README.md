# GlobalStock Live Client

Vite + React + TypeScript + Tailwind CSSで作成した株式情報リアルタイムダッシュボードです。

## Features

- ダークテーマの金融ダッシュボードUI
- `/api/stocks` から株価データを取得
- symbol / name / country / sector の検索
- 5秒ごとの自動更新
- 自動更新ON/OFFと手動更新
- API失敗時はエラーを表示し、直近の成功データを維持
- 上昇は緑、下落は赤で表示

## Development

Server:

```bash
cd server
npm run dev
```

Client:

```bash
cd client
npm run dev
```

Default URLs:

- Client: `http://localhost:5173`
- Server: `http://localhost:4000`
- Stocks API: `http://localhost:4000/api/stocks`

## Configuration

Client API base URL can be changed with:

```bash
VITE_API_BASE_URL=http://localhost:4000 npm run dev
```

API keys must not be placed in the frontend. When replacing the mock API with Finnhub, keep the external API call on the Express server and return normalized stock data from `/api/stocks`.

## Structure

- `src/services/stocksApi.ts`: API access layer. Swap this contract only if the server response changes.
- `src/types/stock.ts`: stock and response types.
- `src/components/`: dashboard UI components.
