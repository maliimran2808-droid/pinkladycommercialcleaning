import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET ALL (Admin)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// ADD NEW (Admin)
export async function POST(req: NextRequest) {
  try {
    const { name, role, photo_url } = await req.json()

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('team_members')
      .insert([{ name, role, photo_url, is_active: true }])
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}