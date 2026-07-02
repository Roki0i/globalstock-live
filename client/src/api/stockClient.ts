import type {
  IndicesApiResponse,
  SectorsApiResponse,
  Stock,
  StockIndex,
  StocksApiResponse,
} from '../types/stock'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

const normalizeStock = (stock: Stock): Stock => ({
  ...stock,
  history: Array.isArray(stock.history) ? stock.history : [],
  change: Number(stock.change),
  changePercent: Number(stock.changePercent),
  price: Number(stock.price),
  previousClose: Number(stock.previousClose),
  volume: Number(stock.volume),
})

const normalizeIndex = (index: StockIndex): StockIndex => ({
  ...index,
  value: Number(index.value),
  change: Number(index.change),
  changePercent: Number(index.changePercent),
})

export const fetchStocks = async (): Promise<StocksApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/stocks`)

  if (!response.ok) {
    throw new Error(`Stocks API failed with status ${response.status}`)
  }

  const payload = (await response.json()) as StocksApiResponse

  return {
    source: payload.source,
    updatedAt: payload.updatedAt,
    data: payload.data.map(normalizeStock),
  }
}

export const fetchTopGainers = async (): Promise<StocksApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/stocks/top-gainers`)

  if (!response.ok) {
    throw new Error(`Top gainers API failed with status ${response.status}`)
  }

  const payload = (await response.json()) as StocksApiResponse

  return {
    source: payload.source,
    updatedAt: payload.updatedAt,
    data: payload.data.map(normalizeStock),
  }
}

export const fetchSectors = async (): Promise<SectorsApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/sectors`)

  if (!response.ok) {
    throw new Error(`Sectors API failed with status ${response.status}`)
  }

  return (await response.json()) as SectorsApiResponse
}

export const fetchIndices = async (): Promise<IndicesApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/indices`)

  if (!response.ok) {
    throw new Error(`Indices API failed with status ${response.status}`)
  }

  const payload = (await response.json()) as IndicesApiResponse

  return {
    source: payload.source,
    updatedAt: payload.updatedAt,
    data: payload.data.map(normalizeIndex),
  }
}
