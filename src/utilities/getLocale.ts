import { headers } from 'next/headers'

export type Locale = 'id' | 'en'

export async function getCurrentLocale(): Promise<Locale> {
  try {
    const headerList = await headers()
    const locale = headerList.get('x-locale')
    return locale === 'en' ? 'en' : 'id'
  } catch {
    return 'id'
  }
}
