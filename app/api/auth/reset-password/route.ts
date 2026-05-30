import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // 1. Find the settings row with this exact token
    const { data: settings, error: dbError } = await supabaseAdmin
      .from('settings')
      .select('id, reset_token')
      .eq('key', 'global')
      .single()

    if (dbError || !settings) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    // 2. Verify token matches
    if (settings.reset_token !== token) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    // 3. Update the password in the database AND clear the token
    const { error: updateError } = await supabaseAdmin
      .from('settings')
      .update({ 
        admin_password: password, // <-- THIS IS THE MAGIC LINE
        reset_token: null         // Destroy the token so it can't be reused
      })
      .eq('id', settings.id)

    if (updateError) {
      console.error('Password update error:', updateError)
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset password crash:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}