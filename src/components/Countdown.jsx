import { useEffect, useState } from 'react'

const EVENT_DATE = new Date('2026-08-08T09:00:00')

function useCountdown(target) {
  const [left, setLeft] = useState(() => target - new Date())

  useEffect(() => {
    const id = setInterval(() => setLeft(target - new Date()), 1000)
    return () => clearInterval(id)
  }, [target])

  const clamped = Math.max(left, 0)
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24))
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((clamped / (1000 * 60)) % 60)
  const secs = Math.floor((clamped / 1000) % 60)
  return { days, hours, mins, secs }
}

export default function Countdown() {
  const { days, hours, mins, secs } = useCountdown(EVENT_DATE)
  return (
    <div className="comic countdown-panel">
      <div className="countdown-label">T-MINUS TO KICKOFF — AUG 8</div>
      <div className="countdown-boxes">
        <div className="count-box"><span className="n">{String(days).padStart(2, '0')}</span><span className="u">days</span></div>
        <div className="count-box"><span className="n">{String(hours).padStart(2, '0')}</span><span className="u">hrs</span></div>
        <div className="count-box"><span className="n">{String(mins).padStart(2, '0')}</span><span className="u">min</span></div>
        <div className="count-box"><span className="n">{String(secs).padStart(2, '0')}</span><span className="u">sec</span></div>
      </div>
    </div>
  )
}
