import { useEffect, useState } from 'react'

export default function IntroSequence({ onDone }) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setClosing(true), 2600)
    const t2 = setTimeout(() => onDone(), 3500)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [onDone])

  const skip = () => onDone()

  return (
    <div
      className="intro-overlay"
      onClick={skip}
      style={closing ? { animationPlayState: 'running' } : undefined}
    >
      <div className="intro-ink-ring" />
      <div className="intro-speedlines" />
      <div className="intro-flash" />
      <div className="intro-title-wrap">
        <span className="intro-kicker font-jp">学生技術シンポジウム</span>
        <h1 className="intro-title">OVERCLOCK'26</h1>
        <div className="intro-sub font-jp">一日限りの伝説 — A LEGEND, ONE DAY ONLY</div>
      </div>
      <div className="intro-skip">TAP ANYWHERE TO SKIP</div>
    </div>
  )
}
