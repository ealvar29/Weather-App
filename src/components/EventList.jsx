import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, Edit2, Clock, X, Check, CalendarDays } from 'lucide-react'

const COLORS = ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'orange']

const DOT = {
  blue: 'bg-blue-500', green: 'bg-green-500', red: 'bg-red-500',
  yellow: 'bg-yellow-400', purple: 'bg-purple-500', pink: 'bg-pink-500', orange: 'bg-orange-500',
}
const BORDER = {
  blue: 'border-l-blue-500', green: 'border-l-green-500', red: 'border-l-red-500',
  yellow: 'border-l-yellow-400', purple: 'border-l-purple-500', pink: 'border-l-pink-500', orange: 'border-l-orange-500',
}

const EMPTY = { title: '', time: '', description: '', color: 'blue' }

export default function EventList({ date, events, onAddEvent, onUpdateEvent, onDeleteEvent }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const openAdd = () => { setEditId(null); setForm(EMPTY); setShowForm(true) }
  const openEdit = (e) => { setEditId(e.id); setForm({ title: e.title, time: e.time || '', description: e.description || '', color: e.color || 'blue' }); setShowForm(true) }
  const close = () => { setShowForm(false); setEditId(null); setForm(EMPTY) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    editId ? onUpdateEvent(date, editId, form) : onAddEvent(date, form)
    close()
  }

  const sorted = [...events].sort((a, b) => (a.time || '').localeCompare(b.time || ''))

  return (
    <div className="bg-slate-800 rounded-2xl p-4 flex flex-col gap-3 h-full overflow-hidden">
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h3 className="text-white font-semibold">{format(date, 'EEEE')}</h3>
          <p className="text-slate-400 text-sm">{format(date, 'MMMM d, yyyy')}</p>
        </div>
        <button
          onClick={openAdd}
          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
          title="Add event"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-700 rounded-xl p-3 flex flex-col gap-2 shrink-0"
        >
          <input
            autoFocus
            type="text"
            placeholder="Event title *"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="bg-slate-600 text-white placeholder-slate-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={form.time}
            onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
            className="bg-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Notes (optional)"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={2}
            className="bg-slate-600 text-white placeholder-slate-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Color:</span>
            <div className="flex gap-1.5">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, color: c }))}
                  className={`w-5 h-5 rounded-full ${DOT[c]} transition-all ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-700 scale-110' : 'opacity-60 hover:opacity-100'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              {editId ? 'Update' : 'Add Event'}
            </button>
            <button
              type="button"
              onClick={close}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-600 hover:bg-slate-500 text-slate-300 rounded-lg text-sm transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {sorted.length === 0 && !showForm && (
          <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center mb-3">
              <CalendarDays className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-slate-500 text-sm">No events scheduled</p>
            <p className="text-slate-600 text-xs mt-1">Press + to add one</p>
          </div>
        )}
        {sorted.map(event => (
          <div
            key={event.id}
            className={`bg-slate-700 rounded-xl p-3 border-l-4 ${BORDER[event.color] || 'border-l-blue-500'}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{event.title}</p>
                {event.time && (
                  <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </p>
                )}
                {event.description && (
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{event.description}</p>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(event)} className="p-1 text-slate-400 hover:text-blue-400 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => onDeleteEvent(date, event.id)} className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
