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

export type StockIndex = {
  country: string
  name: string
  value: number
  change: number
  changePercent: number
}

export type IndicesApiResponse = {
  source: string
  updatedAt: string
  data: StockIndex[]
}

export type SectorSummary = {
  sector: string
  count: number
  averageChangePercent: number
}

export type SectorsApiResponse = {
  source: string
  updatedAt: string
  data: SectorSummary[]
}

export type MarketDirection = 'up' | 'down' | 'flat'
