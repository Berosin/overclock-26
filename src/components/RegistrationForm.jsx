import { useState } from 'react'
import { parseTeamSize } from '../utils/teamSize.js'

const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwEIthFuYmzkLtKGkOZLJY4CgfWC-t2e61Q-HM7qKPNvJMRG3V1GBU3Q6cL3tu1fJSZ/exec'

export default function RegistrationForm({ event }) {
  const { min, max } = parseTeamSize(event.teamSize)
  const isSolo = max === 1
  const isFixed = min === max && !isSolo
  const minExtra = Math.max(min - 1, 0)
  const maxExtra = Math.max(max - 1, 0)

  const [leader, setLeader] = useState({ name: '', email: '', phone: '', college: '' })
  const [teamName, setTeamName] = useState('')
  const [members, setMembers] = useState(() => Array.from({ length: minExtra }, () => ''))
  const [status, setStatus] = useState('idle') // idle | submitting | done | error

  const handleLeaderChange = (e) => {
    const { name, value } = e.target
    setLeader((f) => ({ ...f, [name]: value }))
  }

  const handleMemberChange = (i, value) => {
    setMembers((m) => m.map((v, idx) => (idx === i ? value : v)))
  }

  const addMember = () => {
    if (members.length < maxExtra) setMembers((m) => [...m, ''])
  }

  const removeMember = () => {
    if (members.length > minExtra) setMembers((m) => m.slice(0, -1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (SHEET_ENDPOINT === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      setStatus('error')
      return
    }
    setStatus('submitting')

    const payload = {
      timestamp: new Date().toISOString(),
      eventCode: event.code,
      eventArc: event.arcName,
      eventTitle: event.title,
      name: leader.name,
      email: leader.email,
      phone: leader.phone,
      college: leader.college,
      team: isSolo ? '' : teamName,
      members: members.filter(Boolean).join(', '),
      teamSizeDeclared: event.teamSize,
    }

    try {
      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      setStatus('done')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rp-success">
        <div className="rp-stamp">合格</div>
        <h3 className="rp-success-title">YOU'RE IN, {leader.name.split(' ')[0] || 'CHALLENGER'}!</h3>
        <p className="rp-success-text">
          Registered for <strong>{event.arcName}</strong> ({event.title}). A confirmation
          will be sent to <strong>{leader.email}</strong>. See you on Aug 8.
        </p>
      </div>
    )
  }

  return (
    <form className="rp-form" onSubmit={handleSubmit}>
      {status === 'error' && (
        <p className="rp-error">
          {SHEET_ENDPOINT === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
            ? "Registration isn't wired up yet — the organizer needs to add the Google Sheet endpoint."
            : 'Something went wrong sending that — check your connection and try again.'}
        </p>
      )}

      <div className="rp-section-label">
        {isSolo ? 'YOUR DETAILS' : 'TEAM LEADER'}
      </div>

      <div className="rp-row">
        <label htmlFor="lname">Full Name</label>
        <input id="lname" name="name" value={leader.name} onChange={handleLeaderChange} required placeholder="Jordan Rivera" />
      </div>
      <div className="rp-two">
        <div className="rp-row">
          <label htmlFor="lemail">Email</label>
          <input id="lemail" type="email" name="email" value={leader.email} onChange={handleLeaderChange} required placeholder="you@example.com" />
        </div>
        <div className="rp-row">
          <label htmlFor="lphone">Phone</label>
          <input id="lphone" name="phone" value={leader.phone} onChange={handleLeaderChange} required placeholder="9876543210" />
        </div>
      </div>
      <div className="rp-row">
        <label htmlFor="lcollege">College</label>
        <input id="lcollege" name="college" value={leader.college} onChange={handleLeaderChange} required placeholder="Your college name" />
      </div>

      {!isSolo && (
        <>
          <div className="rp-row">
            <label htmlFor="teamname">Team Name</label>
            <input id="teamname" value={teamName} onChange={(e) => setTeamName(e.target.value)} required placeholder="Team Nitro" />
          </div>

          <div className="rp-section-label rp-section-label-spaced">
            TEAMMATES <span className="rp-hint">({min}–{max} total, including you)</span>
          </div>

          {members.map((val, i) => (
            <div className="rp-row" key={i}>
              <label htmlFor={`member-${i}`}>Member {i + 2}{i < minExtra ? '' : ' (optional)'}</label>
              <input
                id={`member-${i}`}
                value={val}
                onChange={(e) => handleMemberChange(i, e.target.value)}
                required={i < minExtra}
                placeholder="Full name"
              />
            </div>
          ))}

          {!isFixed && (
            <div className="rp-member-controls">
              <button type="button" onClick={addMember} disabled={members.length >= maxExtra} className="rp-chip-btn">
                + ADD MEMBER
              </button>
              <button type="button" onClick={removeMember} disabled={members.length <= minExtra} className="rp-chip-btn">
                − REMOVE
              </button>
            </div>
          )}
        </>
      )}

      <button type="submit" className="rp-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'LOCKING IT IN…' : 'LOCK IT IN'}
      </button>
    </form>
  )
}