"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Eye } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Album = {
  id: string
  title: string
  artist: string
  year: number
  genre: string
  imageurl: string
  tracks: string[]
  clicks?: number
}

export function FeaturedAlbums() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('featured', true)
        .limit(3)
      setAlbums(data || [])
      setLoading(false)
    }
    fetchAlbums()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-80 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {albums.map((album) => (
        <Card key={album.id} className="overflow-hidden art-card-hover group border-2 hover:border-primary">
          <div className="relative">
            <div className="relative h-80">
              <Image
                src={album.imageurl || "/placeholder.svg"}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-white">{album.genre}</Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="h-4 w-4" />
              </Button>
              <Link href={`/album/${album.id}`}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{album.title}</h3>
            <p className="text-gray-600 mb-2">por {album.artist}</p>
            <p className="text-sm text-gray-500 mb-4">
              {album.tracks.length} canciones • {album.year}
            </p>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex justify-between items-center">
            <span className="font-bold text-lg text-primary">{album.year}</span>
            <Link href={`/album/${album.id}`}>
              <Button className="bg-black hover:bg-gray-800 text-white">Ver Álbum</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
