'use client'

import { useState, useEffect } from 'react'
import { Star, Plus, Trash2, Eye, EyeOff, Loader2, MessageSquare, ImagePlus } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  avatar_url: string
  is_active: boolean
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [newText, setNewText] = useState('')
  const [newAvatar, setNewAvatar] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => { fetchReviews() }, [])

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews')
      if (res.ok) setReviews(await res.json())
    } catch (err) { console.error(err) } 
    finally { setLoading(false) }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload-team-photo', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.url) setNewAvatar(data.url)
    } catch (err) { console.error(err) } 
    finally { setIsUploading(false) }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newText) return
    setIsAdding(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, rating: newRating, text: newText, avatar_url: newAvatar }),
      })
      if (res.ok) {
        setNewName('')
        setNewRating(5)
        setNewText('') // <-- FIXED: was setText('') before
        setNewAvatar('')
        setFeedback({ type: 'success', message: '✅ Review added!' })
        fetchReviews()
      } else {
        setFeedback({ type: 'error', message: '❌ Failed to add review.' })
      }
    } catch { 
      setFeedback({ type: 'error', message: '❌ Network error.' }) 
    } 
    finally { setIsAdding(false); setTimeout(() => setFeedback(null), 3000) }
  }

  const toggleActive = async (review: Review) => {
    try {
      const res = await fetch(`/api/admin/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !review.is_active }),
      })
      if (res.ok) fetchReviews()
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
      if (res.ok) fetchReviews()
    } catch (err) { console.error(err) }
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-pink focus:border-transparent transition-all text-sm font-outfit text-gray-800"
  const textareaClass = `${inputClass} resize-none`

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-parkinsans font-bold text-luxury-dark tracking-tight">Reviews Manager</h1>
        <p className="text-gray-500 mt-2 font-outfit text-base">Collect, manage, and showcase client testimonials.</p>
      </div>

      {feedback && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium font-outfit ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {feedback.message}
        </div>
      )}

      {/* Add Review Card */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 mb-10">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
          <MessageSquare size={20} className="text-luxury-pink" />
          <h2 className="text-2xl font-parkinsans font-bold text-luxury-dark">Add New Review</h2>
        </div>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Client Name</label>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Rating (1-5)</label>
              <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} className={`${inputClass} cursor-pointer`}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Client Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-5 border-2 border-gray-200 border-dashed rounded-xl hover:border-luxury-pink transition-colors bg-gray-50">
                <div className="space-y-2 text-center">
                  {newAvatar ? <img src={newAvatar} alt="Avatar" className="mx-auto h-20 w-20 rounded-full object-cover shadow-sm mb-2" /> : <ImagePlus className="mx-auto h-8 w-8 text-gray-300" />}
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-luxury-pink hover:text-luxury-dark text-sm">
                    <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" disabled={isUploading} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block font-outfit">Review Text</label>
            <textarea rows={8} value={newText} onChange={(e) => setNewText(e.target.value)} className={textareaClass} required />
            <button type="submit" disabled={isAdding} className={`mt-6 flex items-center justify-center gap-2 px-6 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-300 ${isAdding ? 'bg-gray-400' : 'bg-luxury-dark hover:bg-luxury-pink'}`}>
              <Plus size={18} /> {isAdding ? 'Adding...' : 'Add Review'}
            </button>
          </div>
        </form>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-luxury-pink animate-spin" /></div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-outfit"><MessageSquare size={40} className="mx-auto mb-3 text-gray-200" /><p className="font-semibold text-gray-500">No reviews yet</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border-2 border-gray-50">
                  {review.avatar_url ? <img src={review.avatar_url} alt={review.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">N/A</div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-luxury-dark font-outfit text-base">{review.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />)}
                  </div>
                </div>
                <button onClick={() => toggleActive(review)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${review.is_active ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' : 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100'}`}>
                  {review.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                  {review.is_active ? 'Live' : 'Hidden'}
                </button>
              </div>
              <p className="text-gray-600 font-outfit text-sm leading-relaxed flex-1 mb-4">&ldquo;{review.text}&rdquo;</p>
              <div className="flex justify-end pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={() => handleDelete(review.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}