import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('key', 'global')
      .single()

    // If no row exists yet, just return empty object (frontend handles defaults)
    if (error && error.code === 'PGRST116') {
      return NextResponse.json({})
    }
    
    if (error) {
      console.error('GET Settings Error:', error)
      return NextResponse.json({}) // Never crash the frontend
    }

    // Flatten the data: extract everything from the 'value' JSONB column
    const flatSettings = {
      ...(data.value || {}),
      id: data.id,
      admin_email: data.admin_email || '',
      admin_password: data.admin_password ? '********' : '', // Mask password for security
    }

    return NextResponse.json(flatSettings)
  } catch (error) {
    console.error('GET Settings Crash:', error)
    return NextResponse.json({})
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Remove internal/temporary fields
    delete body._newEmail
    delete body._newPassword
    delete body._currentPassword
    delete body.id
    delete body.created_at
    delete body.admin_email
    delete body.admin_password

    // 2. Everything left goes into the 'value' JSONB column
    const valueData = { ...body }

    // 3. Check if the settings row exists
    const { data: existing } = await supabaseAdmin
      .from('settings')
      .select('id')
      .eq('key', 'global')
      .single()

    let dbError = null

    if (existing) {
      // Update existing row
      const { error } = await supabaseAdmin
        .from('settings')
        .update({ value: valueData })
        .eq('id', existing.id)
      dbError = error
    } else {
      // Create row for the very first time
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