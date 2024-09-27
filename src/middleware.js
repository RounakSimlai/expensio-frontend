import { NextResponse } from 'next/server'
export function middleware (request) {
  if (request.cookies.has('accessToken') && request.cookie.has('authUser')) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/dashboard', '/expenses', '/categories']
}