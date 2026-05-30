import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('key', 'global')
      .single()

    if (error || !data) return NextResponse.json({})

    // UNPACK: Flatten the JSONB 'value' column so your context gets a flat object
    return NextResponse.json({
      ...(data.value || {}),
    })
  } catch (error) {
    console.error('GET Settings Error:', error)
    return NextResponse.json({})
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Remove temporary fields that don't go in the database
    delete body._newEmail
    delete body._newPassword
    delete body._currentPassword
    delete body.id
    delete body.created_at
    delete body.admin_email
    delete body.admin_password

    // 2. PACK: Everything left goes into the 'value' JSONB column
    const valueData = { ...body }

    // 3. Check if settings row exists
    const { data: existing } = await supabaseAdmin
      .from('settings')
      .select('id')
      .eq('key', 'global')
      .single()

    let dbError = null

    if (existing) {
      const { error } = await supabaseAdmin
        .from('settings')
        .update({ value: valueData })
        .eq('id', existing.id)
      dbError = error
    } else {
      const { error } = await supabaseAdmin
        .from('settings')
        .insert({ key: 'global', value: valueData })
      dbError = error
    }

    if (dbError) {
      console.error('PUT Settings Error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT Settings Crash:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}