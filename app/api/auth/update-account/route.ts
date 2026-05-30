import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newEmail, newPassword } = await req.json()

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required.' }, { status: 400 })
    }

    // 1. Fetch current credentials from DB, fallback to Env Vars
    const { data: settings, error: dbError } = await supabaseAdmin
      .from('settings')
      .select('id, admin_email, admin_password')
      .single()

    if (dbError) throw dbError

    const validPassword = settings?.admin_password || process.env.ADMIN_PASSWORD

    // 2. Verify the current password they typed matches
    if (currentPassword !== validPassword) {
      return NextResponse.json({ error: 'Incorrect current password.' }, { status: 401 })
    }

    // 3. Prepare the updates
    const updates: Record<string, string> = {}
    if (newEmail) updates.admin_email = newEmail
    if (newPassword) updates.admin_password = newPassword

    // 4. Update the database if there are changes
    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('settings')
        .update(updates)
        .eq('id', settings.id)

      if (updateError) throw updateError
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Account update error:', error)
    return NextResponse.json({ error: 'Failed to update account.' }, { status: 500 })
  }
}