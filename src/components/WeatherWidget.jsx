import { Droplets, Wind, Eye, Thermometer } from 'lucide-react'

const GRADIENTS = {
  Clear: 'from-amber-500 to-orange-400',
  Clouds: 'from-slate-500 to-slate-600',
  Rain: 'from-blue-700 to-blue-500',
  Drizzle: 'from-blue-500 to-cyan-400',
  Thunderstorm: 'from-purple-800 to-slate-700',
  Snow: 'from-sky-200 to-blue-100',
  Mist: 'from-slate-400 to-slate-500',
  Fog: 'from-slate-400 to-slate-500',
  Haze: 'from-yellow-700 to-slate-600',
}

export default function WeatherWidget({ current, loading, error }) {
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-2xl h-44 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-2xl h-44 flex items-center justify-center text-center p-6">
        <div>
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-slate-500 text-sm mt-1">Set VITE_OPENWEATHER_API_KEY in your .env file</p>
        </div>
      </div>
    )
  }

  if (!current) return null

  const gradient = GRADIENTS[current.weather[0].main] || 'from-blue-700 to-slate-700'
  const icon = current.weather[0].icon

  return (
    <div className={`rounded-2xl p-5 bg-gradient-to-br ${gradient} text-white shadow-xl`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
            {current.name}, {current.sys.country}
          </p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-7xl font-thin leading-none">{Math.round(current.main.temp)}°</span>
            <span className="text-white/60 text-sm mb-2">F</span>
          </div>
          <p className="text-white/90 text-lg capitalize">{current.weather[0].description}</p>
          <p className="text-white/60 text-sm mt-0.5">
            Feels like {Math.round(current.main.feels_like)}° &nbsp;·&nbsp; H:{Math.round(current.main.temp_max)}° L:{Math.round(current.main.temp_min)}°
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={current.weather[0].description}
          className="w-28 h-28 -mr-2 -mt-2 drop-shadow-lg"
        />
      </div>
      <div className="flex gap-5 mt-3 pt-3 border-t border-white/20 text-white/70 text-sm">
        <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4" />{current.main.humidity}%</span>
        <span className="flex items-center gap-1.5"><Wind className="w-4 h-4" />{Math.round(current.wind.speed)} mph</span>
        <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{((current.visibility || 0) / 1609).toFixed(1)} mi</span>
        <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4" />{current.main.pressure} hPa</span>
      </div>
    </div>
  )
}
