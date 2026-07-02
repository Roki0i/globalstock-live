import { TrendingUp } from 'lucide-react'
import type { Stock } from '../types/stock'

type TopGainersProps = {
  stocks: Stock[]
}

const TopGainers = ({ stocks }: TopGainersProps) => {
  const gainers = [...stocks]
    .filter((stock) => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  return (
    <section className="rounded-lg border border-slate-700/70 bg-slate-950/55 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Top Gainers</h2>
        <TrendingUp size={20} className="text-emerald-300" />
      </div>
      {gainers.length === 0 ? (
        <p className="text-sm text-slate-500">No positive movers in the current result set.</p>
      ) : (
        <div className="space-y-3">
          {gainers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-100">{stock.symbol}</p>
                <p className="text-xs text-slate-500">{stock.name}</p>
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                +{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TopGainers
