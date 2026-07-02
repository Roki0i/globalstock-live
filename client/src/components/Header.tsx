import { Search } from 'lucide-react'
import AutoRefreshControl from './AutoRefreshControl'

type HeaderProps = {
  query: string
  onQueryChange: (value: string) => void
  autoRefresh: boolean
  isLoading: boolean
  lastUpdated?: string
  onToggleAutoRefresh: () => void
  onRefresh: () => void
}

const Header = ({
  query,
  onQueryChange,
  autoRefresh,
  isLoading,
  lastUpdated,
  onToggleAutoRefresh,
  onRefresh,
}: HeaderProps) => (
  <header className="flex flex-col gap-5 border-b border-slate-800/80 pb-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
        Real-time market dashboard
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-normal text-white md:text-5xl">
        GlobalStock Live
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Monitor global equities, sector momentum, and live mock pricing from the server API.
      </p>
    </div>

    <div className="flex flex-col gap-3 lg:min-w-[440px]">
      <label className="relative block">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search symbol, name, country, sector"
          className="w-full rounded-lg border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
        />
      </label>
      <AutoRefreshControl
        enabled={autoRefresh}
        isLoading={isLoading}
        lastUpdated={lastUpdated}
        onToggle={onToggleAutoRefresh}
        onRefresh={onRefresh}
      />
    </div>
  </header>
)

export default Header
