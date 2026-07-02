import { Pause, Play, RefreshCcw } from 'lucide-react'

type AutoRefreshControlProps = {
  enabled: boolean
  isLoading: boolean
  lastUpdated?: string
  onToggle: () => void
  onRefresh: () => void
}

const formatUpdatedTime = (value?: string) => {
  if (!value) return 'Waiting for data'

  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value))
}

const AutoRefreshControl = ({
  enabled,
  isLoading,
  lastUpdated,
  onToggle,
  onRefresh,
}: AutoRefreshControlProps) => (
  <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
    <span className="text-slate-400">Last update: {formatUpdatedTime(lastUpdated)}</span>
    <button
      type="button"
      onClick={onRefresh}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 font-medium text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-200"
    >
      <RefreshCcw size={16} className={isLoading ? 'animate-spin' : ''} />
      Refresh
    </button>
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-medium transition ${
        enabled
          ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
          : 'border-slate-700 bg-slate-900/80 text-slate-300'
      }`}
    >
      {enabled ? <Pause size={16} /> : <Play size={16} />}
      Auto {enabled ? 'On' : 'Off'}
    </button>
  </div>
)

export default AutoRefreshControl
