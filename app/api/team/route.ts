import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
  }
}

// If you had a POST handler here for adding members, keep it, 
// but make sure it uses .from('team_members') too!
export async function POST(req: Request) {
  try {
    const { name, role, photo_url } = await req.json()

    const { error } = await supabaseAdmin
      .from('team_members') // <-- MUST BE team_members
      .insert([{ name, role, photo_url, is_active: true }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding team member:', error)
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
  }
}