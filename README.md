# GlobalStock Live

A global stock-market dashboard for exploring equities, sectors, and major indices from a single interface.

> **Status:** The current API serves mock market data. Real market-data providers will be connected through the backend so provider credentials never need to be exposed to the browser.

## Architecture

```text
React + TypeScript client
        |
        | HTTPS / JSON
        v
Rust + Axum API
        |
        v
Market data providers (planned)
```

## Tech Stack

### Client
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts

### Server
- Rust 2024 edition
- Axum
- Tokio
- Serde
- Tower HTTP

## Security

The backend is intentionally designed as the trust boundary for external market APIs.

- API credentials belong on the server only; never in `VITE_*` variables.
- `unsafe` Rust is forbidden in the server crate.
- The server binds to `127.0.0.1` by default.
- CORS uses an explicit origin allowlist.
- Request bodies are size-limited and requests have a timeout.
- Basic defensive response headers are applied by the API.
- `.env` files and dependency directories are excluded from Git.
- CI builds both applications and runs dependency vulnerability checks.
- Dependabot is configured for both npm and Cargo dependencies.

See [SECURITY.md](SECURITY.md) for reporting guidance.

## API

| Endpoint | Description |
| --- | --- |
| `GET /api/health` | Service health |
| `GET /api/stocks` | Stock list |
| `GET /api/stocks/top-gainers` | Top five gainers |
| `GET /api/sectors` | Sector summaries |
| `GET /api/indices` | Major global indices |

## Local Development

### 1. Start the Rust API

Requires Rust 1.85 or newer.

```bash
cd server
cp .env.example .env
cargo run
```

The API listens on `http://127.0.0.1:4000` by default.

### 2. Start the client

```bash
cd client
cp .env.example .env
npm ci
npm run dev
```

Open the Vite URL shown in the terminal.

## Environment Variables

### Server

```env
SERVER_HOST=127.0.0.1
SERVER_PORT=4000
CLIENT_ORIGINS=http://localhost:5173,http://localhost:5174
```

### Client

```env
VITE_API_BASE_URL=http://127.0.0.1:4000
```

Only public browser configuration should use the `VITE_` prefix. Secret market-data API keys must stay in server-side environment variables.

## Roadmap

- Replace mock data with a production market-data provider
- Add caching and provider rate-limit protection
- Add market-session status and last-updated indicators
- Add global heatmap and richer index views
- Add deployment-specific CSP and HTTPS configuration
