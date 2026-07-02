import { Globe2 } from 'lucide-react'
import type { Stock } from '../types/stock'

type WorldMarketMapProps = {
  stocks: Stock[]
}

const regions = [
  { name: 'North America', x: '22%', y: '38%', markets: ['USA', 'Canada'] },
  { name: 'Europe', x: '49%', y: '32%', markets: ['UK', 'Germany', 'France'] },
  { name: 'Asia Pacific', x: '72%', y: '46%', markets: ['Japan', 'China', 'India'] },
  { name: 'Latin America', x: '34%', y: '68%', markets: ['Brazil', 'Mexico'] },
]

const regionStats = (stocks: Stock[], markets: string[]) => {
  const regionStocks = stocks.filter((stock) => markets.includes(stock.country))

  if (regionStocks.length === 0) {
    return { count: 0, change: 0 }
  }

  return {
    count: regionStocks.length,
    change:
      regionStocks.reduce((total, stock) => total + stock.changePercent, 0) /
      regionStocks.length,
  }
}

const WorldMarketMap = ({ stocks }: WorldMarketMapProps) => (
  <section className="rounded-lg border border-slate-700/70 bg-slate-950/50 p-5 shadow-2xl shadow-black/20 backdrop-blur">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-white">World Market Map</h2>
        <p className="text-sm text-slate-400">Regional heat view from available stock data</p>
      </div>
      <Globe2 className="text-cyan-300" size={24} />
    </div>

    <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-cyan-300/10 bg-[radial-gradient(circle_at_50%_40%,rgba(8,145,178,0.26),transparent_42%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute left-[12%] top-[25%] h-24 w-36 rounded-[45%] border border-cyan-200/20 bg-cyan-300/5" />
      <div className="absolute left-[42%] top-[24%] h-16 w-28 rounded-[50%] border border-cyan-200/20 bg-cyan-300/5" />
      <div className="absolute left-[62%] top-[34%] h-28 w-44 rounded-[48%] border border-cyan-200/20 bg-cyan-300/5" />
      <div className="absolute left-[28%] top-[58%] h-24 w-20 rounded-[45%] border border-cyan-200/20 bg-cyan-300/5" />

      {regions.map((region) => {
        const stats = regionStats(stocks, region.markets)
        const positive = stats.change >= 0

        return (
          <div
            key={region.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: region.x, top: region.y }}
          >
            <div
              className={`h-4 w-4 rounded-full shadow-lg ${
                positive ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-red-400 shadow-red-400/50'
              }`}
            />
            <div className="mt-2 min-w-36 rounded-lg border border-slate-700/80 bg-slate-950/80 p-3 text-left backdrop-blur">
              <p className="text-sm font-semibold text-white">{region.name}</p>
              <p className={positive ? 'text-xs text-emerald-300' : 'text-xs text-red-300'}>
                {stats.count > 0 ? `${positive ? '+' : ''}${stats.change.toFixed(2)}%` : 'No live data'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  </section>
)

export default WorldMarketMap
