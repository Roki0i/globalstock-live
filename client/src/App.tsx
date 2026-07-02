import { useCallback, useEffect, useMemo, useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import GlobalIndices from './components/GlobalIndices'
import Header from './components/Header'
import SectorTrends from './components/SectorTrends'
import TopGainers from './components/TopGainers'
import TopStocks from './components/TopStocks'
import WorldMarketMap from './components/WorldMarketMap'
import { fetchIndices, fetchStocks } from './api/stockClient'
import type { Stock, StockIndex } from './types/stock'

const categoryOrder = [
  'All',
  'Technology',
  'Consumer',
  'Finance',
  'Healthcare',
  'Energy',
  'Industrial',
  'Automotive',
]

function App() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [indices, setIndices] = useState<StockIndex[]>([])
  const [updatedAt, setUpdatedAt] = useState<string>()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadStocks = useCallback(async () => {
    setIsLoading(true)

    try {
      const [stocksResponse, indicesResponse] = await Promise.all([
        fetchStocks(),
        fetchIndices(),
      ])

      setStocks(stocksResponse.data)
      setIndices(indicesResponse.data)
      setUpdatedAt(stocksResponse.updatedAt)
      setError(null)
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to load stock data'

      setError(`${message}. Showing the latest successful data.`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadStocks()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadStocks])

  useEffect(() => {
    if (!autoRefresh) return undefined

    const timer = window.setInterval(() => {
      void loadStocks()
    }, 5000)

    return () => window.clearInterval(timer)
  }, [autoRefresh, loadStocks])

  const filteredStocks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return stocks.filter((stock) => {
      const matchesCategory =
        selectedCategory === 'All' || stock.sector === selectedCategory
      const matchesQuery =
        !normalizedQuery ||
        [stock.symbol, stock.name, stock.country, stock.sector].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        )

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory, stocks])

  const categories = useMemo(() => {
    const availableCategories = new Set(stocks.map((stock) => stock.sector))

    return categoryOrder.filter(
      (category) => category === 'All' || availableCategories.has(category),
    )
  }, [stocks])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(8,145,178,0.28),transparent_32%),linear-gradient(135deg,#020617,#07111f_48%,#020617)] px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header
          query={query}
          onQueryChange={setQuery}
          autoRefresh={autoRefresh}
          isLoading={isLoading}
          lastUpdated={updatedAt}
          onToggleAutoRefresh={() => setAutoRefresh((current) => !current)}
          onRefresh={loadStocks}
        />

        {error ? (
          <div className="rounded-lg border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <WorldMarketMap stocks={filteredStocks} />

        <GlobalIndices indices={indices} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <TopGainers stocks={filteredStocks} />
          <SectorTrends stocks={filteredStocks} />
        </section>

        <TopStocks stocks={filteredStocks} />
      </div>
    </main>
  )
}

export default App
