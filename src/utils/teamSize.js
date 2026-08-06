// Parses strings like "2–4", "1–3", "1 (solo)", "2" into { min, max } total team size
// (including the person registering). Works with en-dash, hyphen, or a bare number.
export function parseTeamSize(str) {
  const matches = String(str).match(/\d+/g) || ['1']
  const min = parseInt(matches[0], 10)
  const max = matches[1] ? parseInt(matches[1], 10) : min
  return { min, max }
}