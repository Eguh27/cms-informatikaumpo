import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  subtitle: string;
  category: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function PageBanner({
  title,
  subtitle,
  category,
  breadcrumbs,
}: PageBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#031744] via-[#08286b] to-[#0d3ea8] pt-32 pb-20 text-white">
      {/* Decorative Parallax Grid & Circles */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute -right-24 -top-24 size-96 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute right-12 top-12 size-64 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 size-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#8eb3ff] mb-4 flex-wrap">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="size-3 opacity-60 shrink-0" />}
              {b.href ? (
                <Link
                  href={b.href}
                  className="hover:text-white transition cursor-pointer"
                >
                  {b.label}
                </Link>
              ) : (
                <span className="text-white font-bold">{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6edbff] backdrop-blur-md">
            {category}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-[#d1e2ff] md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Cloud divider curve matching homepage transition */}
      <div className="cloud-divider" />
    </div>
  );
}
