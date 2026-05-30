import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    // Check if user exists
    const { data: user } = await supabaseAdmin
      .from('admin_users')
      .select('id, email')
      .eq('email', email)
      .single()

    // Security: Always return success even if email doesn't exist (prevents enumeration)
    if (!user) return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3600000).toISOString() // 1 hour from now

    // Save token to DB
    await supabaseAdmin.from('password_resets').insert([{ user_id: user.id, token, expires_at: expiresAt }])

    // Send Email
// FIND THIS (or something similar):
// const resetLink = `http://localhost:3000/admin/reset-password?token=${token}`

// REPLACE WITH THIS:
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get('host')}`
const resetLink = `${baseUrl}/admin/reset-password?token=${token}`

    if (resend) {
      await resend.emails.send({
        from: 'Pink Ladies <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to set a new password. This link expires in 1 hour.</p><p>If you did not request this, ignore this email.</p>`,
      })
    } else {
      console.log('Reset Link (Dev Mode):', resetLink) // Fallback for testing
    }

    return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('Forgot Password Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}