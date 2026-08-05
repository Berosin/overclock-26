import { useEffect, useState } from 'react'

// Drop your manga panel images here: public/panels/slash-left.jpg and slash-right.jpg
const DEFAULT_LEFT = '/panels/slash-left.jpeg'
const DEFAULT_RIGHT = '/panels/slash-right.jpeg'

export default function SlashReveal({ leftImage = DEFAULT_LEFT, rightImage = DEFAULT_RIGHT }) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setClosing(true), 550)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`slash-overlay ${closing ? 'is-closing' : ''}`} aria-hidden="true">
      <div className="slash-half slash-left" style={{ backgroundImage: `url(${leftImage})` }} />
      <div className="slash-half slash-right" style={{ backgroundImage: `url(${rightImage})` }} />
      <div className="slash-streak s1" />
      <div className="slash-streak s2" />
      <div className="slash-flash" />
    </div>
  )
}