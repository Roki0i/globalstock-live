import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import MiniChart from './MiniChart'
import type { Stock } from '../types/stock'

type StockCardProps = {
  stock: Stock
}

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)

const formatVolume = (volume: number) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(volume)

const StockCard = ({ stock }: StockCardProps) => {
  const positive = stock.change >= 0
  const accentClass = positive ? 'text-emerald-400' : 'text-red-400'
  const Icon = positive ? ArrowUpRight : ArrowDownRight

  return (
    <article className="rounded-lg border border-slate-700/70 bg-slate-950/55 p-4 shadow-xl shadow-black/20 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{stock.symbol}</h3>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-cyan-200">
              {stock.country}
            </span>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-slate-400">{stock.name}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${accentClass}`}>
          <Icon size={16} />
          {stock.changePercent.toFixed(2)}%
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-slate-50">
            {formatCurrency(stock.price, stock.currency)}
          </p>
          <p className={`mt-1 text-sm ${accentClass}`}>
            {positive ? '+' : ''}
            {stock.change.toFixed(2)} today
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>{stock.sector}</p>
          <p>Vol {formatVolume(stock.volume)}</p>
        </div>
      </div>

      <div className="mt-3">
        <MiniChart data={stock.history} positive={positive} />
      </div>
    </article>
  )
}

export default StockCard
