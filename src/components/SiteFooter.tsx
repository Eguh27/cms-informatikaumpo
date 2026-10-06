import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react'
import { SITE_LINKS, SITE_MEDIA } from '@/data/siteMedia'

export function SiteFooter({ logoSrc }: { logoSrc?: string }) {
  return (
    <footer className="bg-[#06183d] text-white pt-20 pb-10 mt-auto">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-white p-2">
                <img
                  src={logoSrc || SITE_MEDIA.logoUmpo}
                  alt="Logo UMPO"
                  className="size-8 object-contain"
                />
              </span>
              <span className="font-display text-xl font-bold leading-none tracking-tight text-white">
                Informatika<br />
                <span className="text-[#82aeff]">UMPO</span>
              </span>
            </div>
            <p className="text-sm text-blue-100/70 leading-relaxed mb-6">
              Program Studi Sarjana (S1) Teknik Informatika Universitas Muhammadiyah Ponorogo. Mencetak lulusan yang unggul, inovatif, dan berakhlak mulia di bidang teknologi informasi.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Navigasi</h4>
            <ul className="space-y-3 text-sm text-blue-100/70">
              <li><Link href="/" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Profil Program Studi</Link></li>
              <li><Link href="/akademik" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Akademik & Kurikulum</Link></li>
              <li><Link href="/akademik/jadwal-kuliah" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Jadwal Kuliah</Link></li>
              <li><Link href="/dosen" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Dosen & Tendik</Link></li>
              <li><Link href="/fasilitas" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Fasilitas Laboratorium</Link></li>
              <li><Link href="/berita" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Berita & Pengumuman</Link></li>
              <li><Link href="/download" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Pusat Unduhan</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Kontak & Lokasi</Link></li>
              <li><Link href="/pendaftaran/magang" className="hover:text-white transition flex items-center gap-2"><ChevronRight className="size-3" /> Pendaftaran Magang</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg font-bold mb-6">Kontak & Lokasi</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-[#82aeff] shrink-0" />
                <span>Kampus 1 Universitas Muhammadiyah Ponorogo<br/>Jl. Budi Utomo No.10, Ronowijayan, Kec. Siman, Kabupaten Ponorogo, Jawa Timur 63471</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-[#82aeff] shrink-0" />
                <span>+62 822-6786-8648 (Sekretariat Prodi)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-[#82aeff] shrink-0" />
                <span>informatika@umpo.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-100/50 gap-4">
          <p>© {new Date().getFullYear()} Teknik Informatika Universitas Muhammadiyah Ponorogo.</p>
          <div className="flex items-center gap-4">
            <a href={SITE_LINKS.portalUmpo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Portal UMPO</a>
            <a href={SITE_LINKS.pmb} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">PMB Online</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
