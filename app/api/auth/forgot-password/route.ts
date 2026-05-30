import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { randomUUID } from 'crypto'

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

    // 5. Send the email
    // ---> IMPORTANT: Use whatever email method you currently have setup (Resend, Nodemailer, etc.)
    // Just make sure you send the `resetLink` variable to their email.
    // Example: await sendEmail(validEmail, "Reset Password", resetLink)

    console.log(`PASSWORD RESET LINK (for testing): ${resetLink}`) // Remove this in production

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}