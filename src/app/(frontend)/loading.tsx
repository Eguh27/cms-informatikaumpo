/**
 * Route-level loading skeleton (no extra library — Tailwind animate-pulse).
 * Shown while server components fetch CMS data.
 */
export default function Loading() {
  return (
    <main className="px-canvas" aria-busy="true" aria-label="Memuat konten">
      <div className="mx-auto max-w-7xl animate-pulse px-5 pb-24 pt-32 lg:px-8">
        <div className="h-8 w-48 rounded-full bg-blue-100" />
        <div className="mt-6 h-14 w-3/4 rounded-2xl bg-slate-200" />
        <div className="mt-3 h-14 w-1/2 rounded-2xl bg-slate-200" />
        <div className="mt-6 h-5 w-full max-w-xl rounded-full bg-slate-100" />
        <div className="mt-2 h-5 w-2/3 max-w-lg rounded-full bg-slate-100" />
        <div className="mt-8 flex gap-3">
          <div className="h-12 w-44 rounded-full bg-blue-200" />
          <div className="h-12 w-44 rounded-full bg-slate-200" />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-3xl border border-slate-100 bg-white p-7">
              <div className="h-12 w-16 rounded-xl bg-blue-100" />
              <div className="mt-5 h-7 w-4/5 rounded-lg bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded-full bg-slate-100" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
