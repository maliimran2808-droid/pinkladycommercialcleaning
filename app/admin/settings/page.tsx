'use client'

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingHero, setIsUploadingHero] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          setSettings(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  // Handle text input changes
  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  // Handle Logo Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    setFeedback(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-logo', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setSettings((prev) => ({ ...prev, logo_url: data.url }))
        setFeedback({ type: 'success', message: 'Logo uploaded successfully!' })
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to upload logo.' })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error during upload.' })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle Hero BG Upload
  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingHero(true)
    setFeedback(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-hero-bg', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) {
        setSettings((prev) => ({ ...prev, hero_image_url: data.url }))
        setFeedback({ type: 'success', message: 'Hero background updated!' })
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to upload.' })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error during upload.' })
    } finally {
      setIsUploadingHero(false)
    }
  }

  // Handle Save All Settings
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setFeedback(null)

    try {
      // 1. Save normal site settings
      const settingsToSave = { ...settings }
      delete settingsToSave._newEmail
      delete settingsToSave._newPassword
      delete settingsToSave._currentPassword

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsToSave),
      })

      if (!res.ok) throw new Error('Failed to save settings')

      // 2. Check if Account Security needs updating
      if (settings._currentPassword && (settings._newEmail || settings._newPassword)) {
        const accRes = await fetch('/api/auth/update-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: settings._currentPassword,
            newEmail: settings._newEmail || undefined,
            newPassword: settings._newPassword || undefined,
          }),
        })

        const accData = await accRes.json()
        if (!accRes.ok) {
          setFeedback({ type: 'error', message: accData.error || 'Settings saved, but account update failed.' })
          return
        }
      }

      setFeedback({ type: 'success', message: 'All changes saved successfully!' })
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl flex items-center justify-center py-20">
        <p className="text-gray-400 font-medium">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-luxury-dark">Site Settings</h1>
          <p className="text-gray-500 mt-1">Manage your website's global content and SEO.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className={`px-6 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors duration-200 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-luxury-dark hover:bg-luxury-pink'}`}
        >
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">

        {/* Card 1: Branding & Logo */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-luxury-dark mb-6 border-b pb-3">Branding & Logo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Website Name</label>
              <input 
                type="text" 
                value={settings.site_name || ''} 
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Logo Image</label>
              <div className="flex items-center gap-4">
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="h-12 w-auto object-contain rounded bg-gray-50 p-1 border" />
                ) : (
                  <div className="h-12 w-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No logo</div>
                )}
                <label className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${isUploading ? 'bg-gray-300 text-gray-500' : 'bg-luxury-dark text-white hover:bg-luxury-pink'}`}>
                  {isUploading ? 'Uploading...' : 'Upload New'}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" disabled={isUploading} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Contact & Hours */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-luxury-dark mb-6 border-b pb-3">Contact & Office Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Phone Number</label>
              <input type="text" value={settings.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Email Address</label>
              <input type="email" value={settings.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Office Hours</label>
              <input type="text" value={settings.office_hours || ''} onChange={(e) => handleChange('office_hours', e.target.value)} placeholder="e.g. Monday to Friday, 9:00 AM to 5:00 PM" className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Physical Address</label>
              <input type="text" value={settings.address || ''} onChange={(e) => handleChange('address', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
          </div>
        </div>

        {/* Card 3: SEO Metadata */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-luxury-dark mb-6 border-b pb-3">SEO & Meta Tags</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Meta Title</label>
              <input type="text" value={settings.meta_title || ''} onChange={(e) => handleChange('meta_title', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Meta Description</label>
              <textarea rows={3} value={settings.meta_description || ''} onChange={(e) => handleChange('meta_description', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all resize-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Meta Keywords</label>
              <input type="text" value={settings.meta_keywords || ''} onChange={(e) => handleChange('meta_keywords', e.target.value)} placeholder="cleaning, commercial, office..." className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
          </div>
        </div>

        {/* Card 4: Social Media Links */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-luxury-dark mb-6 border-b pb-3">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Facebook URL</label>
              <input type="url" value={settings.social_facebook || ''} onChange={(e) => handleChange('social_facebook', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Instagram URL</label>
              <input type="url" value={settings.social_instagram || ''} onChange={(e) => handleChange('social_instagram', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">LinkedIn URL</label>
              <input type="url" value={settings.social_linkedin || ''} onChange={(e) => handleChange('social_linkedin', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" placeholder="https://linkedin.com/..." />
            </div>
          </div>
        </div>

        {/* Card 5: Account Security */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-luxury-dark mb-6 border-b pb-3">Account Security</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Change Email Address</label>
              <input type="email" placeholder="Enter new email (leave blank to keep current)" onChange={(e) => setSettings((prev) => ({ ...prev, _newEmail: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Change Password</label>
              <input type="password" placeholder="New password (min 8 chars, leave blank to keep current)" onChange={(e) => setSettings((prev) => ({ ...prev, _newPassword: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div className="pt-4 border-t border-gray-100">
              <label className="text-sm font-semibold text-red-500 mb-1 block">Confirm Current Password to Save Changes</label>
              <input type="password" placeholder="Enter current password" onChange={(e) => setSettings((prev) => ({ ...prev, _currentPassword: e.target.value }))} className="w-full px-4 py-3 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 transition-all" required />
            </div>
          </div>
        </div>

        {/* Card 6: Hero Section Manager */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-luxury-dark mb-6 border-b pb-3">Hero Section</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Main Heading (H1)</label>
              <input type="text" value={settings.hero_heading || ''} onChange={(e) => handleChange('hero_heading', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-pink transition-all" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Background Image</label>
              <div className="flex items-center gap-4">
                {settings.hero_image_url ? (
                  <img src={settings.hero_image_url} alt="Hero BG" className="h-24 w-40 object-cover rounded-md border" />
                ) : (
                  <div className="h-24 w-40 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No image</div>
                )}
                <label className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${isUploadingHero ? 'bg-gray-300 text-gray-500' : 'bg-luxury-dark text-white hover:bg-luxury-pink'}`}>
                  {isUploadingHero ? 'Uploading...' : 'Change Image'}
                  <input type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" disabled={isUploadingHero} />
                </label>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}