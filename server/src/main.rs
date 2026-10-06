#![forbid(unsafe_code)]

use axum::{
    extract::State,
    http::{HeaderName, HeaderValue, Method},
    routing::get,
    Json, Router,
};
use chrono::{SecondsFormat, Utc};
use serde::{Deserialize, Serialize};
use std::{
    collections::BTreeMap,
    env,
    net::{IpAddr, SocketAddr},
    sync::Arc,
    time::Duration,
};
use tower_http::{
    cors::{AllowOrigin, CorsLayer},
    limit::RequestBodyLimitLayer,
    set_header::SetResponseHeaderLayer,
    timeout::TimeoutLayer,
    trace::TraceLayer,
};

const MOCK_UPDATED_AT: &str = "2026-07-02T11:00:00.000Z";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Stock {
    symbol: String,
    name: String,
    country: String,
    sector: String,
    price: f64,
    previous_close: f64,
    change: f64,
    change_percent: f64,
    currency: String,
    volume: u64,
    history: Vec<f64>,
    updated_at: String,
    source: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct MarketIndex {
    country: String,
    name: String,
    value: f64,
    change: f64,
    change_percent: f64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct SectorSummary {
    sector: String,
    count: usize,
    average_change_percent: f64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ApiResponse<T> {
    source: &'static str,
    updated_at: &'static str,
    data: T,
}

#[derive(Debug, Serialize)]
struct HealthResponse {
    ok: bool,
    service: &'static str,
    time: String,
}

#[derive(Clone)]
struct AppState {
    stocks: Arc<Vec<Stock>>,
    indices: Arc<Vec<MarketIndex>>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    tracing_subscriber::fmt().with_target(false).compact().init();

    let stocks: Vec<Stock> = serde_json::from_str(include_str!("../data/stocks.json"))?;
    let indices: Vec<MarketIndex> = serde_json::from_str(include_str!("../data/indices.json"))?;
    let state = AppState {
        stocks: Arc::new(stocks),
        indices: Arc::new(indices),
    };

    let host: IpAddr = env::var("SERVER_HOST")
        .unwrap_or_else(|_| "127.0.0.1".to_owned())
        .parse()?;
    let port: u16 = env::var("SERVER_PORT")
        .unwrap_or_else(|_| "4000".to_owned())
        .parse()?;

    let app = Router::new()
        .route("/api/health", get(health))
        .route("/api/stocks", get(stocks))
        .route("/api/stocks/top-gainers", get(top_gainers))
        .route("/api/sectors", get(sectors))
        .route("/api/indices", get(indices))
        .with_state(state)
        .layer(cors_layer()?)
        .layer(RequestBodyLimitLayer::new(16 * 1024))
        .layer(TimeoutLayer::new(Duration::from_secs(10)))
        .layer(SetResponseHeaderLayer::if_not_present(
            HeaderName::from_static("x-content-type-options"),
            HeaderValue::from_static("nosniff"),
        ))
        .layer(SetResponseHeaderLayer::if_not_present(
            HeaderName::from_static("referrer-policy"),
            HeaderValue::from_static("no-referrer"),
        ))
        .layer(TraceLayer::new_for_http());

    let address = SocketAddr::new(host, port);
    let listener = tokio::net::TcpListener::bind(address).await?;
    tracing::info!(%address, "globalstock-live server listening");

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

fn cors_layer() -> Result<CorsLayer, Box<dyn std::error::Error + Send + Sync>> {
    let raw_origins = env::var("CLIENT_ORIGINS")
        .unwrap_or_else(|_| "http://localhost:5173,http://localhost:5174".to_owned());

    let origins = raw_origins
        .split(',')
        .map(str::trim)
        .filter(|origin| !origin.is_empty())
        .map(HeaderValue::from_str)
        .collect::<Result<Vec<_>, _>>()?;

    if origins.is_empty() {
        return Err(std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "CLIENT_ORIGINS must contain at least one origin",
        )
        .into());
    }

    Ok(CorsLayer::new()
        .allow_origin(AllowOrigin::list(origins))
        .allow_methods([Method::GET]))
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        ok: true,
        service: "globalstock-live-server",
        time: Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true),
    })
}

async fn stocks(State(state): State<AppState>) -> Json<ApiResponse<Vec<Stock>>> {
    Json(ApiResponse {
        source: "mock",
        updated_at: MOCK_UPDATED_AT,
        data: state.stocks.as_ref().clone(),
    })
}

async fn top_gainers(State(state): State<AppState>) -> Json<ApiResponse<Vec<Stock>>> {
    Json(ApiResponse {
        source: "mock",
        updated_at: MOCK_UPDATED_AT,
        data: top_gainers_from(&state.stocks, 5),
    })
}

async fn sectors(State(state): State<AppState>) -> Json<ApiResponse<Vec<SectorSummary>>> {
    Json(ApiResponse {
        source: "mock",
        updated_at: MOCK_UPDATED_AT,
        data: summarize_sectors(&state.stocks),
    })
}

async fn indices(State(state): State<AppState>) -> Json<ApiResponse<Vec<MarketIndex>>> {
    Json(ApiResponse {
        source: "mock",
        updated_at: MOCK_UPDATED_AT,
        data: state.indices.as_ref().clone(),
    })
}

fn top_gainers_from(stocks: &[Stock], limit: usize) -> Vec<Stock> {
    let mut result = stocks.to_vec();
    result.sort_by(|a, b| b.change_percent.total_cmp(&a.change_percent));
    result.truncate(limit);
    result
}

fn summarize_sectors(stocks: &[Stock]) -> Vec<SectorSummary> {
    let mut sectors = BTreeMap::<String, (usize, f64)>::new();

    for stock in stocks {
        let entry = sectors.entry(stock.sector.clone()).or_insert((0, 0.0));
        entry.0 += 1;
        entry.1 += stock.change_percent;
    }

    sectors
        .into_iter()
        .map(|(sector, (count, total_change_percent))| SectorSummary {
            sector,
            count,
            average_change_percent: ((total_change_percent / count as f64) * 100.0).round() / 100.0,
        })
        .collect()
}

async fn shutdown_signal() {
    if tokio::signal::ctrl_c().await.is_err() {
        tracing::warn!("failed to install Ctrl+C handler");
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn fixture_stock(symbol: &str, sector: &str, change_percent: f64) -> Stock {
        Stock {
            symbol: symbol.to_owned(),
            name: symbol.to_owned(),
            country: "Test".to_owned(),
            sector: sector.to_owned(),
            price: 100.0,
            previous_close: 99.0,
            change: 1.0,
            change_percent,
            currency: "USD".to_owned(),
            volume: 1,
            history: vec![],
            updated_at: MOCK_UPDATED_AT.to_owned(),
            source: "mock".to_owned(),
        }
    }

    #[test]
    fn gainers_are_sorted_descending() {
        let stocks = vec![
            fixture_stock("A", "Tech", 0.5),
            fixture_stock("B", "Tech", 2.0),
            fixture_stock("C", "Finance", -1.0),
        ];

        let result = top_gainers_from(&stocks, 2);
        assert_eq!(result[0].symbol, "B");
        assert_eq!(result[1].symbol, "A");
    }

    #[test]
    fn sector_averages_are_calculated() {
        let stocks = vec![
            fixture_stock("A", "Tech", 1.0),
            fixture_stock("B", "Tech", 2.0),
            fixture_stock("C", "Finance", -1.0),
        ];

        let result = summarize_sectors(&stocks);
        let tech = result.iter().find(|item| item.sector == "Tech").unwrap();
        assert_eq!(tech.count, 2);
        assert_eq!(tech.average_change_percent, 1.5);
    }
}
