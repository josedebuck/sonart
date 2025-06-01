import { supabase } from './supabase'

export interface Album {
  id: string
  title: string
  artist: string
  year: number
  price: number
  imageurl: string
  genre: string
  tracks: string[]
  description: string
  artistbio: string
  created_at?: string
  clicks?: number
  featured?: boolean
}

export async function saveAlbum(album: Omit<Album, "id" | "created_at">): Promise<Album> {
  const { data, error } = await supabase
    .from('albums')
    .insert([
      {
        title: album.title,
        artist: album.artist,
        year: Number(album.year),
        price: Number(album.price),
        imageurl: album.imageurl,
        genre: album.genre,
        tracks: album.tracks,
        description: album.description,
        artistbio: album.artistbio,
        clicks: album.clicks ?? 0,
        featured: album.featured ?? false,
      }
    ])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export async function getAlbumById(id: string): Promise<Album | null> {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteAlbum(id: string): Promise<void> {
  const { error } = await supabase
    .from('albums')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
} 