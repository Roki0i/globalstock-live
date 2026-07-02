export type Stock = {
  symbol: string
  name: string
  country: string
  sector: string
  price: number
  previousClose: number
  change: number
  changePercent: number
  currency: string
  volume: number
  history: number[]
  updatedAt: string
  source: string
}

export type StocksApiResponse = {
  source: string
  updatedAt: string
  data: Stock[]
}

export type MarketDirection = 'up' | 'down' | 'flat'
