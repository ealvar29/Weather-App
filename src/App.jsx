import { useState, useCallback } from 'react'
import Header from './components/Header'
import WeatherWidget from './components/WeatherWidget'
import WeatherForecast from './components/WeatherForecast'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import SplashScreen from './components/SplashScreen'
import { useWeather } from './hooks/useWeather'
import { useEvents } from './hooks/useEvents'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [city, setCity] = useState('Chicago')
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { current, forecast, loading, error, refetch } = useWeather(city)
  const { events, getEventsForDate, addEvent, updateEvent, deleteEvent } = useEvents()

  const handleCityChange = useCallback((c) => setCity(c), [])

  if (showSplash) {
    return <SplashScreen onDismiss={() => setShowSplash(false)} />
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      <Header
        city={city}
        onCityChange={handleCityChange}
        onRefresh={() => refetch(city)}
      />
      <main className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-w-0">
          <WeatherWidget current={current} loading={loading} error={error} />
          <WeatherForecast forecast={forecast} />
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            events={events}
            forecast={forecast}
          />
        </div>
        <div className="w-72 shrink-0 flex flex-col">
          <EventList
            date={selectedDate}
            events={getEventsForDate(selectedDate)}
            onAddEvent={addEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
          />
        </div>
      </main>
    </div>
  )
}
