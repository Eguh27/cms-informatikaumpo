import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Lecturers } from './collections/Lecturers'
import { News } from './collections/News'
import { Curriculums } from './collections/Curriculums'
import { Partners } from './collections/Partners'
import { Downloads } from './collections/Downloads'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteMedia } from './SiteMedia/config'
import { HomePage } from './HomePage/config'
import { ProfilePage } from './ProfilePage/config'
import { DosenPage } from './DosenPage/config'
import { FasilitasPage } from './FasilitasPage/config'
import { BeritaPage } from './BeritaPage/config'
import { DownloadPage } from './DownloadPage/config'
import { MagangPage } from './MagangPage/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

import { id } from '@payloadcms/translations/languages/id'
import { en } from '@payloadcms/translations/languages/en'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURL = process.env.DATABASE_URL || ''

// Vercel serverless functions run on a read-only filesystem, so a local SQLite
// file cannot serve the app there: it is never persisted and is recreated empty
// (or fails to open), making every route return 500 at runtime. Fail the build
// early with an actionable message instead of deploying a broken site.
if (process.env.VERCEL) {
  if (databaseURL.startsWith('file:')) {
    throw new Error(
      'DATABASE_URL uses a local SQLite file ("file:..."), which does not work on Vercel. ' +
        'Set DATABASE_URL to a persistent LibSQL/Turso database (libsql://...) in the Vercel project settings.',
    )
  }
  if (databaseURL.startsWith('libsql://') && !process.env.DATABASE_AUTH_TOKEN) {
    throw new Error(
      'DATABASE_URL points to a remote LibSQL database but DATABASE_AUTH_TOKEN is missing. ' +
        'Set DATABASE_AUTH_TOKEN in the Vercel project settings.',
    )
  }
}

export default buildConfig({
  localization: {
    locales: [
      {
        label: 'Bahasa Indonesia',
        code: 'id',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'id',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { id, en },
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: false,
  }),
  collections: [Pages, Media, Categories, Users, Lecturers, News, Curriculums, Partners, Downloads],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteMedia, HomePage, ProfilePage, DosenPage, FasilitasPage, BeritaPage, DownloadPage, MagangPage],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
