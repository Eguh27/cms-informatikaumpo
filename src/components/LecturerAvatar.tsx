/**
 * Dummy lecturer photo placeholder.
 *
 * CMS `lecturers.image` is optional and the seed does not upload photos yet,
 * so most lecturers have no photo. Instead of showing one identical stock
 * photo for everyone, render initials on a deterministic gradient.
 * Replace automatically once a real photo is uploaded in the CMS —
 * callers must prefer `lecturer.image` and use this only as fallback.
 */
function initialsOf(name: string): string {
  const tokens = name
    .split(/[\s,]+/)
    .map((t) => t.replace(/[^A-Za-zÀ-ÿ]/g, ''))
    .filter((t) => t.length > 1)
  const first = tokens[0]?.charAt(0) ?? '?'
  const second = tokens[1]?.charAt(0) ?? ''
  return (first + second).toUpperCase()
}

function hueOf(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 360
  return hash
}

export function LecturerAvatar({ name, className }: { name: string; className?: string }) {
  const hue = hueOf(name)
  return (
    <div
      role="img"
      aria-label={`Foto belum tersedia: ${name}`}
      className={`grid place-items-center font-display font-bold text-white ${className ?? ''}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 55% 45%), hsl(${(hue + 40) % 360} 60% 32%)`,
      }}
    >
      <span aria-hidden="true">{initialsOf(name)}</span>
    </div>
  )
}
