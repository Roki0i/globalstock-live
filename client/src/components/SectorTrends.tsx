import type { Stock } from '../types/stock'

type SectorTrendsProps = {
  stocks: Stock[]
}

const SectorTrends = ({ stocks }: SectorTrendsProps) => {
  const sectors = Object.values(
    stocks.reduce<Record<string, { name: string; count: number; change: number }>>(
      (accumulator, stock) => {
        const current = accumulator[stock.sector] ?? {
          name: stock.sector,
          count: 0,
          change: 0,
        }

        accumulator[stock.sector] = {
          ...current,
          count: current.count + 1,
          change: current.change + stock.changePercent,
        }

        return accumulator
      },
      {},
    ),
  ).map((sector) => ({
    ...sector,
    averageChange: sector.change / sector.count,
  }))

  return (
    <section className="rounded-lg border border-slate-700/70 bg-slate-950/55 p-5 backdrop-blur">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Sector Trends</h2>
        <p className="text-sm text-slate-500">Average movement by sector</p>
      </div>
      <div className="space-y-4">
        {sectors.map((sector) => {
          const positive = sector.averageChange >= 0
          const width = Math.min(Math.abs(sector.averageChange) * 40 + 18, 100)

          return (
            <div key={sector.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-100">{sector.name}</span>
                <span className={positive ? 'text-emerald-400' : 'text-red-400'}>
                  {positive ? '+' : ''}
                  {sector.averageChange.toFixed(2)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={positive ? 'h-full rounded-full bg-emerald-400' : 'h-full rounded-full bg-red-400'}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SectorTrends
