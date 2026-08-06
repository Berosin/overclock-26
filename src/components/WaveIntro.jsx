// Renders no visible output itself — just defines an SVG filter that ripples
// the page like water then settles flat, animated once via SMIL <animate>.
export default function WaveIntro() {
  return (
    <svg className="wave-defs" aria-hidden="true">
      <filter id="rp-wave-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.03 0.1"
          numOctaves="2"
          seed="7"
          result="turb"
        >
          <animate
            attributeName="baseFrequency"
            values="0.035 0.14;0.008 0.03;0.0001 0.0001"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            dur="0.9s"
            begin="0s"
            fill="freeze"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="turb" xChannelSelector="R" yChannelSelector="G">
          <animate
            attributeName="scale"
            values="0;90;0"
            keyTimes="0;0.4;1"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            dur="0.9s"
            begin="0s"
            fill="freeze"
          />
        </feDisplacementMap>
      </filter>
    </svg>
  )
}