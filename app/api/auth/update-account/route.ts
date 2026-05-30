import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newEmail, newPassword } = await req.json()

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required for any changes.' }, { status: 400 })
    }

    // 1. Get the current admin user (assuming single admin setup for now)
    const { data: users, error: userError } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, password_hash')
      .limit(1)

    if (userError || !users || users.length === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const user = users[0]

    // 2. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash)
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect current password.' }, { status: 401 })
    }

    // 3. Update Email if provided
    if (newEmail && newEmail !== user.email) {
      const { error: emailUpdateError } = await supabaseAdmin
        .from('admin_users')
        .update({ email: newEmail })
        .eq('id', user.id)

      if (emailUpdateError) {
        return NextResponse.json({ error: 'Failed to update email. Maybe it is already in use?' }, { status: 500 })
      }
    }

    // 4. Update Password if provided
    if (newPassword) {
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 })
      }
      const salt = await bcrypt.genSalt(10)
      const newHash = await bcrypt.hash(newPassword, salt)

      await supabaseAdmin
        .from('admin_users')
        .update({ password_hash: newHash })
        .eq('id', user.id)
    }

    return NextResponse.json({ success: true, message: 'Account updated successfully!' })
  } catch (error) {
    console.error('Update Account Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}