export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <svg className="brand-mark" width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
          <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#0d0d0d" />
          <polygon points="20,7 31,13 31,27 20,33 9,27 9,13" fill="#d0202a" />
          <text x="20" y="25" textAnchor="middle" fontFamily="'Reggae One', cursive" fontSize="14" fill="#fff">26</text>
        </svg>
        <div className="logo">
          OVERCLOCK<span>'26</span>
          <span className="jp-tag">オーバークロック</span>
        </div>
      </div>
      <a href="#events"><button className="header-cta">EVENTS</button></a>
    </header>
  )
}
