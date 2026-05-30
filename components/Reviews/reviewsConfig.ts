export interface ReviewData {
  id: string // Changed from number to string because Supabase uses UUIDs
  name: string
  rating: number
  text: string
}

// We removed the hardcoded reviewsData array! Goodbye! 👋