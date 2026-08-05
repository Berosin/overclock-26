// Drop your manga panel images here: public/panels/
// events.js supplies the FULL filename including extension for each event.
const DEFAULT_LEFT = '/panels/slash-left.jpeg'
const DEFAULT_RIGHT = '/panels/slash-right.jpeg'

export default function SlashReveal({ leftImage = DEFAULT_LEFT, rightImage = DEFAULT_RIGHT }) {
  return (
    <div className="slash-overlay" aria-hidden="true">
      <div className="slash-half slash-left" style={{ backgroundImage: `url(${leftImage})` }} />
      <div className="slash-half slash-right" style={{ backgroundImage: `url(${rightImage})` }} />
      <div className="slash-streak s1" />
      <div className="slash-streak s2" />
      <div className="slash-flash" />
    </div>
  )
}