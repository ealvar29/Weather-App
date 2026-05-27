import { useState, useCallback } from 'react'
import { format } from 'date-fns'

const STORAGE_KEY = 'skycal_events'

function loadEvents() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function useEvents() {
  const [events, setEvents] = useState(loadEvents)

  const getEventsForDate = useCallback(
    (date) => events[format(date, 'yyyy-MM-dd')] || [],
    [events]
  )

  const persist = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  }

  const addEvent = useCallback((date, event) => {
    const key = format(date, 'yyyy-MM-dd')
    setEvents(prev =>
      persist({ ...prev, [key]: [...(prev[key] || []), { ...event, id: crypto.randomUUID() }] })
    )
  }, [])

  const updateEvent = useCallback((date, eventId, updates) => {
    const key = format(date, 'yyyy-MM-dd')
    setEvents(prev =>
      persist({ ...prev, [key]: (prev[key] || []).map(e => e.id === eventId ? { ...e, ...updates } : e) })
    )
  }, [])

  const deleteEvent = useCallback((date, eventId) => {
    const key = format(date, 'yyyy-MM-dd')
    setEvents(prev =>
      persist({ ...prev, [key]: (prev[key] || []).filter(e => e.id !== eventId) })
    )
  }, [])

  return { events, getEventsForDate, addEvent, updateEvent, deleteEvent }
}
