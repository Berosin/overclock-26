// Drop your manga panel images here: public/panels/
// events.js supplies the FULL filename including extension for each event,
// plus optional position/size overrides to fix cropping per image.
const DEFAULT_LEFT = '/panels/slash-left.jpeg'
const DEFAULT_RIGHT = '/panels/slash-right.jpeg'

export default function SlashReveal({
  leftImage = DEFAULT_LEFT,
  rightImage = DEFAULT_RIGHT,
  leftPosition = 'center',   // e.g. 'center 20%' shifts the visible crop UP, 'center 80%' shifts it DOWN
  leftSize = 'cover',        // e.g. '160%' zooms out (shows more), 'cover' fills the box (default)
  rightPosition = 'center',
  rightSize = 'cover',
}) {
  return (
    <div className="slash-overlay" aria-hidden="true">
      <div
        className="slash-half slash-left"
        style={{
          backgroundImage: `url(${leftImage})`,
          backgroundPosition: leftPosition,
          backgroundSize: leftSize,
        }}
      />
      <div
        className="slash-half slash-right"
        style={{
          backgroundImage: `url(${rightImage})`,
          backgroundPosition: rightPosition,
          backgroundSize: rightSize,
        }}
      />
      <div className="slash-streak s1" />
      <div className="slash-streak s2" />
      <div className="slash-flash" />
    </div>
  )
}