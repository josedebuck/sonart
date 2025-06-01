export interface Album {
  id: string
  title: string
  description: string
  imageurl: string
  artist: string
  year: number
  price: number
  tracks: string[]
  spotifyUrl?: string
  appleMusicUrl?: string
  youtubeUrl?: string
  bandcampUrl?: string
  soundcloudUrl?: string
  featured?: boolean
  created_at?: string
  updated_at?: string
} 