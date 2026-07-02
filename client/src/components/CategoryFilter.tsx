type CategoryFilterProps = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => (
  <section className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-4 backdrop-blur">
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-white">Categories</h2>
        <p className="text-sm text-slate-500">Filter stocks by sector</p>
      </div>
      <span className="text-xs text-slate-500">{selectedCategory}</span>
    </div>

    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const selected = category === selectedCategory

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected
                ? 'border-cyan-300 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-cyan-400/60 hover:text-white'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  </section>
)

export default CategoryFilter
