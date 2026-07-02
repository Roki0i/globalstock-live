import { Activity } from 'lucide-react'
import type { StockIndex } from '../types/stock'

type GlobalIndicesProps = {
  indices: StockIndex[]
}

const formatValue = (value: number) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(value)

const GlobalIndices = ({ indices }: GlobalIndicesProps) => (
  <section className="rounded-lg border border-slate-700/70 bg-slate-950/55 p-5 backdrop-blur">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-white">Global Indices</h2>
        <p className="text-sm text-slate-500">Major country index moves from mock data</p>
      </div>
      <Activity size={20} className="text-cyan-300" />
    </div>

    {indices.length === 0 ? (
      <p className="text-sm text-slate-500">No index data available.</p>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {indices.map((index) => {
          const positive = index.change >= 0
          const accentClass = positive ? 'text-emerald-400' : 'text-red-400'

          return (
            <div
              key={`${index.country}-${index.name}`}
              className="rounded-lg border border-slate-800 bg-slate-950/70 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {index.country}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-100">{index.name}</h3>
                </div>
                <span className={`text-sm font-semibold ${accentClass}`}>
                  {positive ? '+' : ''}
                  {index.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-xl font-semibold text-white">{formatValue(index.value)}</p>
                <p className={`text-sm ${accentClass}`}>
                  {positive ? '+' : ''}
                  {index.change.toFixed(2)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )}
  </section>
)

export default GlobalIndices
