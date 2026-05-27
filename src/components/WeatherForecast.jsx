import { format, fromUnixTime } from 'date-fns'

export default function WeatherForecast({ forecast }) {
  if (!forecast.length) return null

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">5-Day Forecast</p>
      <div className="flex gap-2">
        {forecast.map(day => (
          <div
            key={day.dt}
            className="flex-1 flex flex-col items-center gap-0.5 bg-slate-700/60 rounded-xl py-3 px-1"
          >
            <span className="text-slate-400 text-xs font-medium">
              {format(fromUnixTime(day.dt), 'EEE')}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-9 h-9"
            />
            <span className="text-white text-sm font-semibold">{Math.round(day.main.temp_max)}°</span>
            <span className="text-slate-500 text-xs">{Math.round(day.main.temp_min)}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}
