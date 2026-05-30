import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value
  const { pathname } = request.nextUrl

  // 1. If the user is already logged in and tries to go to the login page, redirect them to dashboard
  if (session === 'authenticated' && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/leads', request.url))
  }

  // 2. If the user is NOT logged in and tries to access protected routes, redirect to login
if (session !== 'authenticated') {
    // Protect the admin dashboard pages
    if (pathname.startsWith('/admin') && pathname !== '/admin/login' && pathname !== '/admin/forgot-password' && pathname !== '/admin/reset-password') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Protect the sensitive API routes (so people can't just hit the API directly)
    if (
      pathname.startsWith('/api/admin') || 
      pathname.startsWith('/api/submissions') || 
      pathname.startsWith('/api/settings') || 
      pathname.startsWith('/api/upload-logo')
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // 3. Allow the request to continue
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/submissions/:path*',
    '/api/settings',
    '/api/upload-logo',
  ],
}