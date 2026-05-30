import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    // 1. Get the actual admin email from DB or fallback to .env
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('admin_email')
      .eq('key', 'global')
      .single()

    const adminEmail = settings?.admin_email || process.env.ADMIN_EMAIL

    // Security: Always return success so hackers can't guess emails
    if (email !== adminEmail) {
      return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
    }

    // 2. Generate secure token (EXACTLY like your working code)
    const token = crypto.randomBytes(32).toString('hex')

    // 3. Save token to the settings table (so reset-password API can find it)
    await supabaseAdmin
      .from('settings')
      .update({ reset_token: token })
      .eq('key', 'global')

    // 4. Create the reset link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get('host')}`
    const resetLink = `${baseUrl}/admin/reset-password?token=${token}`

    // 5. Send Email (EXACTLY your working Resend setup)
    if (resend) {
      await resend.emails.send({
        from: 'Pink Ladies <support@pinkladies.com>',
        to: [adminEmail],
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to set a new password. This link expires in 1 hour.</p><p>If you did not request this, ignore this email.</p>`,
      })
      console.log('✅ Reset email sent successfully to:', adminEmail)
    } else {
      console.log('⚠️ Resend not configured. Dev link:', resetLink)
    }

    return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('❌ Forgot Password Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}