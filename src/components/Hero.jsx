export default function Hero() {
  return (
    <section className="hero">
      <div className="comic hero-panel">
        <div className="speed-lines" aria-hidden="true" />
        <div className="burst b1">FREE!!</div>
        <div className="hero-inner">
          <span className="hero-kicker font-jp">学生技術シンポジウム — STUDENT TECH SYMPOSIUM</span>
          <h1 className="hero-title">
            OVERCLOCK<br /><span className="stroke-red">YOUR IDEAS.</span>
          </h1>
          <p className="hero-sub">
            One day. Eight arcs. A campus full of builders, debuggers, pitchers, and
            solo ronin designers — all racing the same clock.
          </p>
          <a href="#events"><button className="cta-primary">SEE ALL EVENTS →</button></a>
        </div>
      </div>

      <div className="comic hero-side">
        <div className="stat-tile"><span className="label font-mono">Date</span><span className="value">Aug 8, 2026</span></div>
        <div className="stat-tile"><span className="label font-mono">Format</span><span className="value">8 Events</span></div>
        <div className="stat-tile"><span className="label font-mono">Venue</span><span className="value">Loyola ICAM college of Engineering and Technology</span></div>
        <div className="stat-tile"><span className="label font-mono">Entry</span><span className="value">Free</span></div>
      </div>
    </section>
  )
}
