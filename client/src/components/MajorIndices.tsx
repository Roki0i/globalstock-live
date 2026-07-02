import { Activity } from 'lucide-react'
import type { Stock } from '../types/stock'

type MajorIndicesProps = {
  stocks: Stock[]
}

const baseIndices = [
  { name: 'S&P 500', value: 5482.4, changePercent: 0.34 },
  { name: 'Nasdaq 100', value: 19764.2, changePercent: 0.51 },
  { name: 'Nikkei 225', value: 39215.8, changePercent: -0.18 },
]

const MajorIndices = ({ stocks }: MajorIndicesProps) => {
  const averageChange =
    stocks.length > 0
      ? stocks.reduce((total, stock) => total + stock.changePercent, 0) / stocks.length
      : 0
  const indices = [
    ...baseIndices,
    { name: 'Mock Equity Basket', value: stocks.length * 1000 + 3200, changePercent: averageChange },
  ]

  return (
    <section className="rounded-lg border border-slate-700/70 bg-slate-950/55 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Major Indices</h2>
        <Activity size={20} className="text-cyan-300" />
      </div>
      <div className="space-y-3">
        {indices.map((index) => {
          const positive = index.changePercent >= 0

          return (
            <div key={index.name} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-100">{index.name}</p>
                <p className="text-xs text-slate-500">{index.value.toLocaleString('en-US')}</p>
              </div>
              <span className={positive ? 'text-sm font-semibold text-emerald-400' : 'text-sm font-semibold text-red-400'}>
                {positive ? '+' : ''}
                {index.changePercent.toFixed(2)}%
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MajorIndices
