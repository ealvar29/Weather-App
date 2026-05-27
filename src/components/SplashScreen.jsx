import { useEffect, useState } from 'react'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function SplashScreen({ onDismiss }) {
  const [fadeOut, setFadeOut] = useState(false)

  const dismiss = () => {
    setFadeOut(true)
    setTimeout(onDismiss, 500)
  }

  useEffect(() => {
    const t = setTimeout(dismiss, 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 cursor-pointer transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-6 animate-[fadeInUp_0.6s_ease_forwards]">
        <img
          src="/greeting.webp"
          alt="Greeting"
          className="w-56 h-56 object-cover rounded-full shadow-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-slate-900"
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">{getGreeting()}!</h1>
          <p className="text-slate-400 mt-2 text-lg">Your schedule & weather is ready</p>
        </div>
        <button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-colors shadow-lg shadow-blue-900"
          onClick={dismiss}
        >
          Open SkyCal
        </button>
        <p className="text-slate-600 text-sm">or click anywhere to continue</p>
      </div>
    </div>
  )
}
