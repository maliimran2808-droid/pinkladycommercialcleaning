import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') throw error
    
    return NextResponse.json(data || {})
  } catch (error) {
    console.error('Fetch settings error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Clean out temporary frontend fields
    delete body._newEmail
    delete body._newPassword
    delete body._currentPassword
    delete body.id
    delete body.created_at

    // 2. Separate admin credentials (real columns) from general settings (go in 'value' JSONB)
    const adminUpdates: Record<string, string> = {}
    if (body.admin_email) adminUpdates.admin_email = body.admin_email
    if (body.admin_password) adminUpdates.admin_password = body.admin_password
    delete body.admin_email
    delete body.admin_password

    // The rest of the body goes into the `value` JSONB column
    const valueUpdates = { ...body }

    // 3. Check if settings row exists
    const { data: existing } = await supabaseAdmin
      .from('settings')
      .select('id')
      .single()

    let error;
    if (existing) {
      // Update existing row
      const { error: updateError } = await supabaseAdmin
        .from('settings')
        .update({ 
          value: valueUpdates, 
          ...adminUpdates 
        })
        .eq('id', existing.id)
      error = updateError
    } else {
      // Create new row satisfying all constraints
      const { error: insertError } = await supabaseAdmin
        .from('settings')
        .insert({ 
          key: 'global', 
          value: valueUpdates, 
          ...adminUpdates 
        })
      error = insertError
    }

    if (error) {
      console.error('Settings save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings save crash:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}