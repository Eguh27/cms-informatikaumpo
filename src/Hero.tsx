import type { PageId } from "./App";
import useHeroScroll from "./useHeroScroll";
import "./hero.css";

function ArrowRight({ small = false }: { small?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={small ? 16 : 18}
      height={small ? 16 : 18}
      fill="none"
    >
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FLOATING_ICONS = [
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 8-9 12 9 12M26 8l9 12-9 12M23 6l-6 28" />
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="10" y="10" width="20" height="20" rx="3" /><rect x="15" y="15" width="10" height="10" rx="1" />
    <path d="M15 6v4M25 6v4M15 30v4M25 30v4M6 15h4M6 25h4M30 15h4M30 25h4" />
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="20" cy="8" r="4" /><circle cx="8" cy="32" r="4" /><circle cx="32" cy="32" r="4" />
    <path d="m18 12-8 16M22 12l8 16M12 32h16" />
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M14 5c-4 0-6 2-6 6v6c0 3-3 3-3 3s3 0 3 3v6c0 4 2 6 6 6M26 5c4 0 6 2 6 6v6c0 3 3 3 3 3s-3 0-3 3v6c0 4-2 6-6 6" />
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="20" cy="20" r="6" />
    <path d="M20 4v4M20 32v4M4 20h4M32 20h4M9 9l3 3M28 28l3 3M9 31l3-3M28 12l3-3" />
  </svg>,
];

interface HeroProps {
  navigateTo: (page: PageId, subTab?: string) => void;
}

export default function Hero({ navigateTo }: HeroProps) {
  const { heroRef, step, goToStep0, goToStep1 } = useHeroScroll();

  return (
    <>
      <div ref={heroRef} className="hero-wrapper" data-hero-step={step}>
        <section className="hero-sticky" data-hero-sticky aria-labelledby="hero-title">

          {/* Layer 0: Sky gradient */}
          <div className="hero-sky" data-hero-sky aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />

          {/* Layer 1: Clouds */}
          <img
            className="hero-clouds hero-clouds-one"
            data-hero-cloud
            src="/assets/hero/awan.webp"
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero-clouds hero-clouds-two"
            data-hero-cloud
            src="/assets/hero/awan.webp"
            alt=""
            aria-hidden="true"
          />

          {/* Layer 2: Floating tech icons */}
          {FLOATING_ICONS.map((icon, index) => (
            <span
              key={index}
              className={`tech-icon tech-icon-${index + 1}`}
              data-hero-icon
              aria-hidden="true"
            >
              {icon}
            </span>
          ))}

          {/* Layer 3: Building — positioned lower down with top dome clearly visible */}
          <div className="building-layer" data-hero-building aria-hidden="true">
            <img
              src="/assets/hero/gedung-cerah.webp"
              alt="Gedung Fakultas Teknik dan Kampus Universitas Muhammadiyah Ponorogo"
              width={1678}
              height={937}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Layer 4: Organic SVG ground cover — replaces photo taman, seamlessly masks bottom crop */}
          <div className="hero-ground-cover" data-hero-ground-cover aria-hidden="true">
            <svg viewBox="0 0 1440 140" fill="none" preserveAspectRatio="none">
              <path
                d="M0 65C240 22 480 85 720 45C960 12 1200 78 1440 38V140H0V65Z"
                fill="rgba(213, 230, 246, 0.55)"
              />
              <path
                d="M0 80C320 42 640 95 960 62C1200 36 1360 76 1440 56V140H0V80Z"
                fill="rgba(255, 232, 204, 0.45)"
              />
              <path
                d="M0 95C300 68 600 110 900 82C1180 52 1350 90 1440 76V140H0V95Z"
                fill="#FFFBF5"
              />
            </svg>
          </div>

          {/* Layer 5: Text content — Phase 1 (Opening) */}
          <div className="hero-content hero-content-primary" data-hero-content-primary>
            <div className="hero-content-glass">
              <div className="hero-eyebrow" data-hero-title>
                <span className="eyebrow-dot" />
                Penerimaan Mahasiswa Baru
              </div>

              <h1 id="hero-title" data-hero-title>
                Code the future.
                <span>Shape the world.</span>
              </h1>

              <p data-hero-subtitle>
                Program Studi Teknik Informatika Universitas Muhammadiyah
                Ponorogo yang menghubungkan teknologi, kreativitas, dan dampak
                nyata untuk masa depan Indonesia berbasis nilai-nilai keislaman.
              </p>

              <div className="hero-actions" data-hero-cta>
                <button
                  className="primary-button"
                  onClick={() => navigateTo("akademik")}
                >
                  Eksplorasi Kurikulum
                  <span><ArrowRight /></span>
                </button>
                <button
                  className="secondary-button"
                  onClick={() => navigateTo("profil")}
                >
                  Profil &amp; Visi Keilmuan <ArrowRight small />
                </button>
              </div>
            </div>
          </div>

          {/* Layer 6: Text content — Phase 2 (Pergantian teks saat scroll zoom) */}
          <div className="hero-content hero-content-second" data-hero-content-second>
            <div className="hero-content-glass hero-second-glass">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                Visi Keilmuan &amp; Riset Terapan
              </div>

              <h2 className="hero-second-title">
                Algoritma Komputasi.
                <span>Berkarakter Islami.</span>
              </h2>

              <p className="hero-second-desc">
                Pendidikan komputasi unggulan dengan fokus riset Kecerdasan Buatan (AI), Machine Learning, Internet of Things, dan Rekayasa Perangkat Lunak modern untuk kemajuan industri dan pemerintahan.
              </p>

              <div className="hero-features-pills">
                <span className="feature-pill">
                  <svg className="size-4 text-[#1E6FD9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>
                  Kecerdasan Buatan &amp; IoT
                </span>
                <span className="feature-pill">
                  <svg className="size-4 text-[#1E6FD9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  Rekayasa Perangkat Lunak
                </span>
                <span className="feature-pill">
                  <svg className="size-4 text-[#FFB84D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Akreditasi B BAN-PT
                </span>
              </div>

              <div className="hero-actions mt-3">
                <button
                  className="primary-button"
                  onClick={() => navigateTo("profil", "visimisi")}
                >
                  Pelajari Visi &amp; Roadmap
                  <span><ArrowRight /></span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="hero-stats" data-hero-stats>
            <span className="stats-kicker">Tumbuh bersama kami</span>
            <div className="stat-group">
              {[
                ["B", "Akreditasi BAN-PT"],
                ["800+", "Mahasiswa aktif"],
                ["30+", "Dosen & tendik"],
                ["1.800+", "Alumni"],
              ].map(([value, label], idx) => (
                <div
                  className={`stat-item ${idx === 0 ? "stat-item-featured" : ""}`}
                  key={label}
                >
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step indicator dots */}
          <div className="hero-step-indicator" aria-label="Navigasi presentasi hero">
            <button
              type="button"
              className={`step-dot ${step === 0 ? "step-dot-active" : ""}`}
              onClick={goToStep0}
              aria-label="Tahap 1: Selamat Datang"
              title="Tahap 1: Pembuka"
            />
            <button
              type="button"
              className={`step-dot ${step === 1 ? "step-dot-active" : ""}`}
              onClick={goToStep1}
              aria-label="Tahap 2: Visi Keilmuan & Riset"
              title="Tahap 2: Visi & Riset"
            />
          </div>

          {/* Scroll indicator */}
          <button
            className="scroll-indicator"
            data-hero-scroll-indicator
            type="button"
            onClick={() => {
              if (step === 0) {
                goToStep1();
              } else {
                document.getElementById("profil")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            aria-label={step === 0 ? "Lanjut ke visi keilmuan" : "Gulir ke profil prodi"}
          >
            <span>{step === 0 ? "Visi Keilmuan" : "Jelajahi Profil"}</span>
            <i><b /></i>
          </button>
        </section>
      </div>
    </>
  );
}
