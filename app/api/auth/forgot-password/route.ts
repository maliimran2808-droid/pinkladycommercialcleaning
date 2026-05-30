import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend' // <-- FIXED: Using your working import
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    // 1. Check if email matches the admin email in settings
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('admin_email')
      .eq('key', 'global')
      .single()

    const validEmail = settings?.admin_email || process.env.ADMIN_EMAIL

    // Security: Always return success even if email doesn't exist
    if (email !== validEmail) {
      return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
    }

    // 2. Generate secure token
    const token = crypto.randomBytes(32).toString('hex')

    // 3. Save token to the settings table
    const { error: dbError } = await supabaseAdmin
      .from('settings')
      .update({ reset_token: token })
      .eq('key', 'global')

    if (dbError) {
      console.error('Token save error:', dbError)
    }

    // 4. Create the reset link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get('host')}`
    const resetLink = `${baseUrl}/admin/reset-password?token=${token}`

    // 5. Send the email using your working Resend setup
    if (resend) {
      await resend.emails.send({
        from: 'Pink Ladies <support@pinkladies.com>',
        to: [validEmail],
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb; border-radius: 12px;">
            <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Password Reset Request</h1>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
                We received a request to reset your dashboard password. Click the button below to choose a new one:
              </p>
              <a href="${resetLink}" style="display: inline-block; background-color: #ec4899; color: white; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3);">
                Reset Password
              </a>
              <p style="color: #9ca3af; font-size: 14px; margin-top: 32px; line-height: 1.5;">
                If you didn't request this, you can safely ignore this email. This link will expire once used.
              </p>
            </div>
          </div>
        `,
      })
    } else {
      console.log('Reset Link (Dev Mode):', resetLink)
    }

    return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('Forgot Password Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}