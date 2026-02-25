import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow public routes
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/callback', '/creators']
  const pathname = request.nextUrl.pathname

  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/creators/'))) {
    return NextResponse.next()
  }

  // Check for Supabase auth cookie
  const supabaseCookie = request.cookies.get('sb-iighurcqmstessqzpojy-auth-token')
  if (!supabaseCookie && (pathname.startsWith('/dashboard') || pathname.startsWith('/messages'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
