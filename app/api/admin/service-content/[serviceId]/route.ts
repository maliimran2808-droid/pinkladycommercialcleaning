import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  
  try {
    const { data, error } = await supabaseAdmin
      .from('service_page_contents')
      .select('*')
      .eq('service_id', serviceId)
      .single()

    if (error && error.code === 'PGRST116') {
      const { data: newData, error: insertError } = await supabaseAdmin
        .from('service_page_contents')
        .insert([{ service_id: serviceId }])
        .select()
        .single()

      if (insertError) throw insertError
      return NextResponse.json(newData)
    }

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching service content:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  
  try {
    const body = await req.json()
    
    const { error } = await supabaseAdmin
      .from('service_page_contents')
      .update(body)
      .eq('service_id', serviceId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating service content:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}