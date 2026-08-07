import { useParams, useNavigate, Link } from 'react-router-dom'
import { EVENTS, COMMON_GUIDELINES } from '../data/events.js'
import SlashReveal from '../components/SlashReveal.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const KANJI_WATERMARKS = ['術', '刃', '筆', '虫', '賞', '宝', '無', '絆']


export default function EventPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const index = EVENTS.findIndex((e) => e.id === id)
  const event = EVENTS[index]

  if (!event) {
    return (
      <div className="app">
        <Header />
        <div className="section" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h2 className="font-display" style={{ fontSize: 32 }}>ARC NOT FOUND</h2>
          <Link to="/" className="back-link">← BACK TO ALL EVENTS</Link>
        </div>
      </div>
    )
  }

  const kanji = KANJI_WATERMARKS[index % KANJI_WATERMARKS.length]

return (
  <div className="app">
   
      <SlashReveal
        key={id}
        leftImage={event.slashLeft}
        rightImage={event.slashRight}
        leftPosition={event.slashLeftPosition}
        leftSize={event.slashLeftSize}
        rightPosition={event.slashRightPosition}
        rightSize={event.slashRightSize}
      />
      <Header />

      <div className="section event-page">
        <span className="back-link" onClick={() => navigate('/')}>← BACK TO ALL EVENTS</span>

        <div className="comic event-hero">
          <span className="event-hero-kanji" aria-hidden="true">{kanji}</span>
          <div className="event-hero-streaks" aria-hidden="true" />
          <div className="event-hero-inner">
            <div className="modal-code font-mono">{event.code}</div>
            <h1 className="event-hero-arc">{event.arcName}</h1>
            <div className="modal-title font-jp">{event.title}</div>
            <div className="modal-tagline">"{event.tagline}"</div>
          </div>
        </div>

        <div className="event-body">
          <p className="modal-desc">{event.description}</p>

          <div className="modal-grid">
            <div className="modal-fact"><span className="fk font-mono">Team Size</span><span className="fv">{event.teamSize}</span></div>
            <div className="modal-fact"><span className="fk font-mono">Time</span><span className="fv">{event.time}</span></div>
            <div className="modal-fact"><span className="fk font-mono">Venue</span><span className="fv">{event.venue}</span></div>
            <div className="modal-fact"><span className="fk font-mono">Query</span><span className="fv" style={{ fontSize: 13 }}>{event.query.phone}</span></div>
          </div>

          <div className="modal-subhead">Format</div>
          <ul className="modal-list">{event.format.map((f, i) => <li key={i}>{f}</li>)}</ul>

          <div className="modal-subhead">Judged On</div>
          <ul className="modal-list">{event.judging.map((j, i) => <li key={i}>{j}</li>)}</ul>

          <div className="modal-subhead">Organizers</div>
          <ul className="modal-list">{event.organizers.map((o, i) => <li key={i}>{o.name} — {o.role}</li>)}</ul>

          <div className="modal-subhead">Guidelines</div>
          <ul className="modal-list modal-guidelines">{COMMON_GUIDELINES.map((g, i) => <li key={i}>{g}</li>)}</ul>

          <p style={{ fontSize: 13, color: '#666', margin: '10px 0 26px' }}>
            Queries: {event.query.name} · {event.query.email}
          </p>

          <Link to={`/events/${id}/register`}>
            <button className="modal-register-btn">REGISTER FOR THIS ARC →</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}