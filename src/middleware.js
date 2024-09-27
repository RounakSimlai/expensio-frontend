'use client'
import { NextResponse } from 'next/server'

export function middleware (request) {
  if (request.cookies.get('accessToken')) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/dashboard', '/expenses', '/categories']
}