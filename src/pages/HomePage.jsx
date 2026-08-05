import { useState } from 'react'
import IntroSequence from '../components/IntroSequence.jsx'
import Header from '../components/Header.jsx'
import Marquee from '../components/Marquee.jsx'
import Hero from '../components/Hero.jsx'
import EventsGrid from '../components/EventsGrid.jsx'
import Countdown from '../components/Countdown.jsx'
import Footer from '../components/Footer.jsx'

export default function HomePage() {
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem('overclock26_intro_seen') === 'true')

  const handleIntroDone = () => {
    sessionStorage.setItem('overclock26_intro_seen', 'true')
    setIntroDone(true)
  }

  return (
    <div className="app">
      {!introDone && <IntroSequence onDone={handleIntroDone} />}

      <Header />
      <Marquee />
      <Hero />

      <section className="section" id="events">
        <span className="section-title">THE EIGHT ARCS <span className="jp-mark">八つの章</span></span>
        <p className="section-intro">
          Eight events, eight arcs. Click any panel to open its full brief and register.
        </p>
        <EventsGrid />
      </section>

      <section className="section">
        <Countdown />
      </section>

      <Footer />
    </div>
  )
}