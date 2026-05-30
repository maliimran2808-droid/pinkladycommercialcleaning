import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// UPDATE (Toggle Active)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = (await params).id
    const body = await req.json()

    const { error } = await supabaseAdmin
      .from('testimonials')
      .update(body)
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = (await params).id

    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}