import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // 1. Get credentials specifically from our 'global' settings row
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('admin_email, admin_password')
      .eq('key', 'global')
      .single()

    // 2. Use DB credentials, or fall back to Environment Variables
    const validEmail = settings?.admin_email || process.env.ADMIN_EMAIL || ''
    const validPassword = settings?.admin_password || process.env.ADMIN_PASSWORD || ''

    if (!validEmail || !validPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // 3. Check credentials
    if (email === validEmail && password === validPassword) {
      const response = NextResponse.json({ success: true })

      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: req.url.startsWith('https'),
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}