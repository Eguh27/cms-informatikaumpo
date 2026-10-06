import type { GlobalConfig } from 'payload'

/**
 * Site-wide imagery editable from the Payload admin panel.
 * All fields are optional: the frontend falls back to the dummy
 * constants in `@/data/siteMedia` when a field is empty.
 */
export const SiteMedia: GlobalConfig = {
  slug: 'site-media',
  label: 'Media Situs',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo UMPO (navigasi & footer)',
    },
    {
      name: 'heroBuilding',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto gedung (hero & profil)',
    },
    {
      name: 'heroCloud',
      type: 'upload',
      relationTo: 'media',
      label: 'Awan dekoratif (hero & banner)',
    },
    {
      name: 'himatifBanner',
      type: 'upload',
      relationTo: 'media',
      label: 'Latar banner HIMATIF',
    },
  ],
}
