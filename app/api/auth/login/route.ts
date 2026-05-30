import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (email === adminEmail && password === adminPassword) {
      const response = NextResponse.json({ success: true })

      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: req.url.startsWith('https'), // Automatically true on Vercel, false locally
        sameSite: 'lax', // Changed to 'lax' - prevents redirect cookie dropping
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}