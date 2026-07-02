import type { Stock, StocksApiResponse } from '../types/stock'

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
