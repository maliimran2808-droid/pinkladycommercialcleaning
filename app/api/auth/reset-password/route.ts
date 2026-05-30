import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password || password.length < 8) {
      return NextResponse.json({ error: 'Token and a valid password (min 8 chars) are required' }, { status: 400 })
    }

    // 1. Find the token
    const { data: resetEntry, error } = await supabaseAdmin
      .from('password_resets')
      .select('id, user_id, expires_at')
      .eq('token', token)
      .single()

    if (error || !resetEntry) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 })
    }

    // 2. Check if token is expired
    if (new Date(resetEntry.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Token has expired. Please request a new one.' }, { status: 400 })
    }

    // 3. Hash new password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // 4. Update user's password
    await supabaseAdmin
      .from('admin_users')
      .update({ password_hash: passwordHash })
      .eq('id', resetEntry.user_id)

    // 5. Delete the used token
    await supabaseAdmin.from('password_resets').delete().eq('id', resetEntry.id)

    return NextResponse.json({ success: true, message: 'Password updated successfully!' })
  } catch (error) {
    console.error('Reset Password Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}