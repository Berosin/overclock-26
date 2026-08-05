const WORDS = [
  { t: 'ドン', jp: true }, { t: 'BOOT!' }, { t: 'ゴゴゴ', jp: true }, { t: 'COMPILE!' },
  { t: 'バーン', jp: true, accent: true }, { t: 'DEPLOY!' }, { t: 'ザッ', jp: true }, { t: 'SHIP IT!', accent: true },
  { t: 'ドドド', jp: true }, { t: 'HACK!' }, { t: 'ギュン', jp: true, accent: true }, { t: 'LAUNCH!' },
]

export default function Marquee() {
  const loop = [...WORDS, ...WORDS]
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {loop.map((w, i) => (
          <span key={i} className={[w.jp ? 'jp' : '', w.accent ? 'accent' : ''].join(' ').trim()}>
            {w.t}
          </span>
        ))}
      </div>
    </div>
  )
}
