import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ignore internal Next.js assets, API, admin, and media
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/media') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Check if pathname starts with /en
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const strippedPath = pathname.replace(/^\/en/, '') || '/'
    const url = req.nextUrl.clone()
    url.pathname = strippedPath

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-locale', 'en')

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
    response.cookies.set('NEXT_LOCALE', 'en', { path: '/' })
    return response
  }

  // If path starts with /id, redirect cleanly to unprefixed canonical URL
  if (pathname === '/id' || pathname.startsWith('/id/')) {
    const strippedPath = pathname.replace(/^\/id/, '') || '/'
    const url = req.nextUrl.clone()
    url.pathname = strippedPath
    return NextResponse.redirect(url)
  }

  // Default locale is 'id'
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-locale', 'id')

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.cookies.set('NEXT_LOCALE', 'id', { path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|media|[\\w-]+\\.\\w+).*)'],
}
