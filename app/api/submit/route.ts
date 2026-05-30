import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'

// 1. Strict Validation Schema
const submissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  service: z.string().optional(),
  address: z.string().optional(),
  info: z.string().optional(),
  source: z.enum(['hero', 'booking']), // Ensures only valid sources
})

export async function POST(req: NextRequest) {
  try {
    // 2. Parse and Validate Body
    const body = await req.json()
    const validatedData = submissionSchema.parse(body)

    // 3. Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('submissions')
      .insert([validatedData])

    if (dbError) {
      console.error('Supabase Insert Error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Failed to save submission. Please try again.' },
        { status: 500 }
      )
    }

    // 4. Send Email Notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Pink Ladies <onboarding@resend.dev>', // Update this later when you verify a custom domain
          to: [process.env.NEXT_PUBLIC_EMAIL || 'fallback@example.com'],
          subject: `New Lead: ${validatedData.name} - ${validatedData.service || 'General Inquiry'}`,
          html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a;">New Quote Request 🧹</h2>
              <p>You received a new lead from the <strong>${validatedData.source}</strong> form.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${validatedData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                  <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
                  <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${validatedData.phone}">${validatedData.phone}</a></td>
                </tr>
                ${validatedData.service ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service</td><td style="padding: 8px; border: 1px solid #ddd;">${validatedData.service}</td></tr>` : ''}
                ${validatedData.address ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Address</td><td style="padding: 8px; border: 1px solid #ddd;">${validatedData.address}</td></tr>` : ''}
                ${validatedData.info ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Additional Info</td><td style="padding: 8px; border: 1px solid #ddd;">${validatedData.info}</td></tr>` : ''}
              </table>
              
              <p style="margin-top: 20px; font-size: 14px; color: #888;">Check your admin dashboard for more details.</p>
            </div>
          `,
        })
      } catch (emailError) {
        // Log email error but don't fail the request for the user
        console.error('Resend Email Error:', emailError)
      }
    }

    // 5. Return Success
    return NextResponse.json({ 
      success: true, 
      message: 'Submission received successfully!' 
    })

  } catch (error) {
    // Catch Zod validation errors or other crashes
    // Catch Zod validation errors or other crashes
    console.error('API Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid data provided.', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Something went wrong on the server.' },
      { status: 500 }
    )
  }
}