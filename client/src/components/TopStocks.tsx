import StockCard from './StockCard'
import type { Stock } from '../types/stock'

type TopStocksProps = {
  stocks: Stock[]
}

const TopStocks = ({ stocks }: TopStocksProps) => (
  <section className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-5 backdrop-blur">
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-white">Top Stocks</h2>
        <p className="text-sm text-slate-400">Filtered live feed from the mock API</p>
      </div>
      <span className="text-sm text-slate-500">{stocks.length} symbols</span>
    </div>
    {stocks.length === 0 ? (
      <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-8 text-center text-slate-400">
        No stocks match your search.
      </div>
    ) : (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    )}
  </section>
)

export default TopStocks
