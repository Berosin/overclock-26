const SPLATS = [
  { top: '10%', left: '9%', rot: -18, size: 1.0, kanji: '登録', delay: 0.00 },
  { top: '16%', left: '80%', rot: 22, size: 0.85, kanji: '参戦', delay: 0.07 },
  { top: '46%', left: '5%', rot: 10, size: 0.7, kanji: '挑戦', delay: 0.14 },
  { top: '58%', left: '88%', rot: -12, size: 0.95, kanji: '覚悟', delay: 0.21 },
  { top: '82%', left: '16%', rot: 16, size: 0.8, kanji: '決意', delay: 0.28 },
  { top: '86%', left: '72%', rot: -8, size: 0.75, kanji: '参加', delay: 0.35 },
]

export default function InkSplatterReveal() {
  return (
    <div className="ink-splatter-layer" aria-hidden="true">
      {SPLATS.map((s, i) => (
        <div
          key={i}
          className="ink-splat"
          style={{
            top: s.top,
            left: s.left,
            '--rot': `${s.rot}deg`,
            '--scale': s.size,
            '--delay': `${s.delay}s`,
          }}
        >
          <span className="ink-blob" />
          <span className="ink-kanji font-jp">{s.kanji}</span>
        </div>
      ))}
    </div>
  )
}