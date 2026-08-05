import { Link } from 'react-router-dom'
import { EVENTS } from '../data/events.js'

const KANJI_WATERMARKS = ['術', '刃', '筆', '虫', '賞', '宝', '無', '絆']

export default function EventsGrid() {
  return (
    <div className="events-grid">
      {EVENTS.map((ev, i) => (
        <Link className="comic event-card" key={ev.id} to={`/events/${ev.id}`}>
          <span className="ec-kanji" aria-hidden="true">{KANJI_WATERMARKS[i % KANJI_WATERMARKS.length]}</span>
          <span className="ec-streaks" aria-hidden="true" />
          <span className="ec-team font-mono">{ev.teamSize}</span>
          <div className="ec-corner" aria-hidden="true" />
          <span className="ec-code font-mono">{ev.code}</span>
          <h3 className="ec-arc">{ev.arcName}</h3>
          <span className="ec-title">{ev.title}</span>
        </Link>
      ))}
    </div>
  )
}