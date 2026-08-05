import { useState } from 'react'

// STEP 1 of the setup guide: paste your deployed Google Apps Script Web App URL here.
// See the README section "Wiring registrations to Google Sheets" for the full walkthrough.
const SHEET_ENDPOINT = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'

export default function RegistrationForm({ event, onBack }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', team: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | done | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
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
      name: form.name,
      email: form.email,
      phone: form.phone,
      college: form.college,
      team: form.team,
    }

    try {
      // Apps Script web apps don't return CORS headers to fetch(), so we fire in
      // no-cors mode. We can't read the response, but the row still lands in the sheet.
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
      <div className="success-panel">
        <div className="stamp">合格！</div>
        <h3 className="font-display" style={{ fontSize: 24, margin: '6px 0' }}>
          YOU'RE IN, {form.name.split(' ')[0] || 'CHALLENGER'}!
        </h3>
        <p>
          Registered for <strong>{event.arcName}</strong> ({event.title}). A confirmation
          will be sent to <strong>{form.email}</strong>. See you on Aug 8.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <span className="back-link" onClick={onBack}>← BACK TO EVENT DETAILS</span>

      {status === 'error' && (
        <p className="form-error">
          {SHEET_ENDPOINT === 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
            ? 'Registration isn\'t wired up yet — the organizer needs to add the Google Sheet endpoint. See the setup guide.'
            : 'Something went wrong sending that — check your connection and try again.'}
        </p>
      )}

      <div className="form-row">
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Jordan Rivera" />
      </div>
      <div className="form-two">
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
        </div>
        <div className="form-row">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="9876543210" />
        </div>
      </div>
      <div className="form-two">
        <div className="form-row">
          <label htmlFor="college">College</label>
          <input id="college" name="college" value={form.college} onChange={handleChange} required placeholder="Your college name" />
        </div>
        <div className="form-row">
          <label htmlFor="team">Team Name {event.teamSize.includes('1') && event.teamSize.length === 1 ? '(optional)' : ''}</label>
          <input id="team" name="team" value={form.team} onChange={handleChange} placeholder="Team Nitro" />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'LOCKING IT IN…' : 'LOCK IT IN!'}
      </button>
    </form>
  )
}
