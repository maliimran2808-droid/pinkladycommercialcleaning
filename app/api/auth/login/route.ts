import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // 1. Find user by email
    const { data: user, error: dbError } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, password_hash')
      .eq('email', email)
      .single()

    if (dbError || !user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // 3. Set secure session cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}