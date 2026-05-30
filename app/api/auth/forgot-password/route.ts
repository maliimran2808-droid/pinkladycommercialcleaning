import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { randomUUID } from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // 1. Check if email matches the admin email
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('admin_email')
      .eq('key', 'global')
      .single()

    const validEmail = settings?.admin_email || process.env.ADMIN_EMAIL

    // Security: Always return success so hackers can't guess emails
    if (email !== validEmail) {
      return NextResponse.json({ success: true })
    }

    // 2. Generate a secure token
    const token = randomUUID()

    // 3. Save token to the database
    const { error: dbError } = await supabaseAdmin
      .from('settings')
      .update({ reset_token: token })
      .eq('key', 'global')

    if (dbError) {
      console.error('Token save error:', dbError)
      return NextResponse.json({ error: 'Failed to generate reset link' }, { status: 500 })
    }

    // 4. Create the reset link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get('host')}`
    const resetLink = `${baseUrl}/admin/reset-password?token=${token}`

    // 5. Send the email using Resend
    // ⚠️ IMPORTANT: Change 'onboarding@resend.dev' to your actual verified domain (e.g., 'support@pinkladycommercialcleaning.com')
    await resend.emails.send({
      from: 'Pink Lady Cleaning <support@pinkladycommercialcleaning.com>', 
      to: validEmail,
      subject: 'Reset Your Dashboard Password',
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}