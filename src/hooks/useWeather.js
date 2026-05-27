import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export function useWeather(city) {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName) return
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      setError('Add your OpenWeatherMap key to .env as VITE_OPENWEATHER_API_KEY')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: { q: cityName, appid: API_KEY, units: 'imperial' },
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: { q: cityName, appid: API_KEY, units: 'imperial' },
        }),
      ])
      setCurrent(currentRes.data)
      const daily = forecastRes.data.list.filter(item =>
        item.dt_txt.includes('12:00:00')
      )
      setForecast(daily.slice(0, 5))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather')
      setCurrent(null)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeather(city)
  }, [city, fetchWeather])

  return { current, forecast, loading, error, refetch: fetchWeather }
}
