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
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() // Expects: { site_name: 'New Name', phone: '123', ... }

    // Convert the object back into an array of { key, value } for Supabase upsert
    const updates = Object.entries(body).map(([key, value]) => ({
      key,
      value: value as string,
    }))

    const { error } = await supabaseAdmin
      .from('settings')
      .upsert(updates, { onConflict: 'key' })

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Settings updated successfully!' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}