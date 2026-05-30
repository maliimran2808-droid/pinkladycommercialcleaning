import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET: Fetch all settings and format them into a clean object
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('key, value')

    if (error) throw error

    // Convert array [{ key: 'site_name', value: 'Pink Ladies' }, ...] 
    // into object { site_name: 'Pink Ladies', ... }
    const settings: Record<string, string> = {}
    data.forEach((item: { key: string; value: string }) => {
      settings[item.key] = item.value
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT: Update settings
// Inside your PUT handler in app/api/settings/route.ts

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    // Remove internal fields if they exist
    delete body._newEmail
    delete body._newPassword
    delete body._currentPassword
    delete body.id
    delete body.created_at

    // 1. Check if a settings row exists
    const { data: existing } = await supabaseAdmin
      .from('settings')
      .select('id')
      .single()

    let error;
    
    if (existing) {
      // 2a. Row exists -> UPDATE
      const result = await supabaseAdmin
        .from('settings')
        .update(body)
        .eq('id', existing.id)
      error = result.error
    } else {
      // 2b. Row doesn't exist -> INSERT (ensuring constraints are met)
      const result = await supabaseAdmin
        .from('settings')
        .insert({ 
          key: 'global', 
          value: {}, 
          ...body 
        })
      error = result.error
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