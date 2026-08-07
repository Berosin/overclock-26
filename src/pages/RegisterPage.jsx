import { useParams, useNavigate, Link } from 'react-router-dom'
import { EVENTS } from '../data/events.js'
import { parseTeamSize } from '../utils/teamSize.js'
import RegistrationForm from '../components/RegistrationForm.jsx'
import InkSplatterReveal from '../components/InkSplatterReveal.jsx'
import WaveIntro from '../components/WaveIntro.jsx'
const WAVE_DURATION = 0.9 // seconds — must match the dur values in WaveIntro.jsx

export default function RegisterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="register-page">
        <div className="rp-wrap" style={{ textAlign: 'center' }}>
          <h2 className="font-display" style={{ fontSize: 32 }}>ARC NOT FOUND</h2>
          <Link to="/" className="back-link">← BACK TO ALL EVENTS</Link>
        </div>
      </div>
    )
  }

  const { min, max } = parseTeamSize(event.teamSize)
  const teamCopy =
    max === 1
      ? 'Solo entry — no team needed.'
      : min === max
      ? `Exactly ${min} members per team.`
      : `Assemble a team of ${min}–${max}.`

  return (
    <div className="register-page">

      <WaveIntro key={`wave-${id}`} />
      <InkSplatterReveal key={`ink-${id}`} baseDelay={WAVE_DURATION} />

      <div className="rp-wrap rp-wave-wrap">
        <span className="back-link rp-back" onClick={() => navigate(`/events/${id}`)}>
          ← BACK TO {event.arcName}
        </span>

        <div className="rp-header">
          <span className="rp-code font-mono">{event.code} · REGISTRATION</span>
          <h1 className="rp-arc">{event.arcName}</h1>
          <div className="rp-title font-jp">{event.title}</div>
          <p className="rp-team-copy">{teamCopy}</p>
        </div>

        <div className="rp-card">
          <RegistrationForm event={event} />
        </div>
      </div>
    </div>
  )
}