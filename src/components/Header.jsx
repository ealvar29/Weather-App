import { useState, useEffect } from 'react'
import { Search, Cloud, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'

export default function Header({ city, onCityChange, onRefresh }) {
  const [input, setInput] = useState(city)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) onCityChange(input.trim())
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
      <div className="flex items-center gap-2">
        <Cloud className="text-blue-400 w-6 h-6" />
        <span className="text-white font-bold text-xl tracking-tight">SkyCal</span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search city…"
            className="bg-slate-700 text-white pl-9 pr-3 py-1.5 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm w-44"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Go
        </button>
        <button
          type="button"
          onClick={onRefresh}
          title="Refresh weather"
          className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </form>

      <div className="text-right">
        <p className="text-white font-medium tabular-nums">{format(time, 'h:mm:ss aa')}</p>
        <p className="text-slate-400 text-xs">{format(time, 'EEEE, MMMM d, yyyy')}</p>
      </div>
    </header>
  )
}
