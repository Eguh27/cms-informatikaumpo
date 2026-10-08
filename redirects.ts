import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Kontak kini menjadi tab di dalam /profil (#kontak), bukan halaman terpisah.
  const kontakRedirect = {
    source: '/kontak',
    destination: '/profil#kontak',
    permanent: false,
  }

  return [internetExplorerRedirect, kontakRedirect]
}
