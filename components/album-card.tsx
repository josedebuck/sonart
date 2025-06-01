'use client'

import { Album } from '@/types/album'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface AlbumCardProps {
  album: Album
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg">{album.title}</CardTitle>
        <CardDescription className="line-clamp-2">{album.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {album.imageurl && (
          <img
            src={album.imageurl}
            alt={album.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {album.featured && (
          <Button variant="outline" size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">
            <Star className="h-4 w-4 mr-2" />
            Destacado
          </Button>
        )}
        {album.spotifyUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
              Spotify
            </Link>
          </Button>
        )}
        {album.appleMusicUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={album.appleMusicUrl} target="_blank" rel="noopener noreferrer">
              Apple Music
            </Link>
          </Button>
        )}
        {album.youtubeUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={album.youtubeUrl} target="_blank" rel="noopener noreferrer">
              YouTube
            </Link>
          </Button>
        )}
        {album.bandcampUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={album.bandcampUrl} target="_blank" rel="noopener noreferrer">
              Bandcamp
            </Link>
          </Button>
        )}
        {album.soundcloudUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={album.soundcloudUrl} target="_blank" rel="noopener noreferrer">
              SoundCloud
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 