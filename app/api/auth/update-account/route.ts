import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newEmail, newPassword } = await req.json()

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required.' }, { status: 400 })
    }

    // 1. Fetch current credentials from DB
    let { data: settings, error: dbError } = await supabaseAdmin
      .from('settings')
      .select('id, admin_email, admin_password')
      .single()

    // If no settings row exists, create one first
    if (dbError && dbError.code === 'PGRST116') {
      const { data: newSettings, error: insertError } = await supabaseAdmin
        .from('settings')
        .insert({ admin_email: process.env.ADMIN_EMAIL, admin_password: process.env.ADMIN_PASSWORD })
        .select('id, admin_email, admin_password')
        .single()

      if (insertError) {
        console.error('Failed to create settings row:', insertError)
        return NextResponse.json({ error: `DB Error: ${insertError.message}` }, { status: 500 })
      }
      settings = newSettings
    } else if (dbError) {
      console.error('DB Fetch Error:', dbError)
      return NextResponse.json({ error: `DB Error: ${dbError.message}` }, { status: 500 })
    }

    // 2. Use DB credentials, or fall back to Environment Variables
    const validPassword = settings?.admin_password || process.env.ADMIN_PASSWORD

    // 3. Verify the current password
    if (currentPassword !== validPassword) {
      return NextResponse.json({ error: 'Incorrect current password.' }, { status: 401 })
    }

    // 4. Prepare updates
    const updates: Record<string, string> = {}
    if (newEmail) updates.admin_email = newEmail
    if (newPassword) updates.admin_password = newPassword

    // 5. Update database
    if (Object.keys(updates).length > 0 && settings?.id) {
      const { error: updateError } = await supabaseAdmin
        .from('settings')
        .update(updates)
        .eq('id', settings.id)

      if (updateError) {
        console.error('DB Update Error:', updateError)
        return NextResponse.json({ error: `Update failed: ${updateError.message}` }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Account update crash:', error)
    return NextResponse.json({ error: 'Server crashed during update.' }, { status: 500 })
  }
}