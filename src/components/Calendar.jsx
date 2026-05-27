import { useState } from 'react'
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, fromUnixTime,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEK_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const DOT_COLORS = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
}

function getForecastForDate(forecast, date) {
  return forecast.find(f => {
    const fd = fromUnixTime(f.dt)
    return fd.getFullYear() === date.getFullYear() &&
           fd.getMonth() === date.getMonth() &&
           fd.getDate() === date.getDate()
  })
}

export default function Calendar({ selectedDate, onSelectDate, events, forecast }) {
  const [viewMonth, setViewMonth] = useState(new Date())

  const monthStart = startOfMonth(viewMonth)
  const monthEnd = endOfMonth(viewMonth)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)
  const days = eachDayOfInterval({ start: calStart, end: calEnd })

  return (
    <div className="bg-slate-800 rounded-2xl p-4 flex-1">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewMonth(m => subMonths(m, 1))}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-semibold">{format(viewMonth, 'MMMM yyyy')}</h2>
        <button
          onClick={() => setViewMonth(m => addMonths(m, 1))}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEK_HEADERS.map(d => (
          <div key={d} className="text-center text-slate-500 text-xs font-medium py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {days.map(day => {
          const inMonth = day.getMonth() === viewMonth.getMonth()
          const selected = isSameDay(day, selectedDate)
          const today = isToday(day)
          const key = format(day, 'yyyy-MM-dd')
          const dayEvents = events[key] || []
          const fc = getForecastForDate(forecast, day)

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`
                relative flex flex-col items-center rounded-xl py-1 px-0.5 min-h-[60px] transition-all
                ${!inMonth ? 'opacity-25' : ''}
                ${selected
                  ? 'bg-blue-600 shadow-lg shadow-blue-900'
                  : today
                  ? 'bg-slate-700 ring-2 ring-blue-500'
                  : 'hover:bg-slate-700/70'}
              `}
            >
              <span className={`text-xs font-semibold leading-none mb-0.5 ${selected ? 'text-white' : today ? 'text-blue-400' : 'text-slate-300'}`}>
                {format(day, 'd')}
              </span>
              {fc && (
                <img
                  src={`https://openweathermap.org/img/wn/${fc.weather[0].icon}.png`}
                  alt=""
                  className="w-6 h-6"
                />
              )}
              {fc && (
                <span className={`text-[10px] leading-none ${selected ? 'text-white/80' : 'text-slate-400'}`}>
                  {Math.round(fc.main.temp_max)}°
                </span>
              )}
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-auto pt-0.5 flex-wrap justify-center">
                  {dayEvents.slice(0, 3).map(e => (
                    <span key={e.id} className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[e.color] || 'bg-blue-500'}`} />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
