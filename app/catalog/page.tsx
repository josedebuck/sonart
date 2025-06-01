"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchBar } from "@/components/search-bar"
import { Play, Eye, Filter } from "lucide-react"
import { getAlbums, type Album } from "@/lib/albums"

export default function CatalogPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])
  const searchParams = useSearchParams()

  const searchTerm = searchParams?.get("search") || ""
  const artistParam = searchParams?.get("artist") || ""
  const yearParam = searchParams?.get("year") || ""

  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = async () => {
    try {
      const savedAlbums = await getAlbums()
      setAlbums(savedAlbums)
    } catch (error) {
      console.error("Error loading albums:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre)
      } else {
        return [...prev, genre]
      }
    })
  }

  const handleArtistChange = (artist: string) => {
    setSelectedArtists((prev) => {
      if (prev.includes(artist)) {
        return prev.filter((a) => a !== artist)
      } else {
        return [...prev, artist]
      }
    })
  }

  const filteredAlbums = albums.filter((album) => {
    const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(album.genre)
    const artistMatch = selectedArtists.length === 0 || selectedArtists.includes(album.artist)
    const searchMatch = !searchTerm || 
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    const yearMatch = !yearParam || album.year.toString() === yearParam
    const artistParamMatch = !artistParam || 
      album.artist.toLowerCase().includes(artistParam.replace("-", " ").toLowerCase())

    return genreMatch && artistMatch && searchMatch && yearMatch && artistParamMatch
  })

  // Get unique genres and artists from albums
  const genres = Array.from(new Set(albums.map(album => album.genre)))
  const artists = Array.from(new Set(albums.map(album => album.artist)))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo Musical</h1>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg border p-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </h3>

                {/* Genre Filters */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-gray-500">Géneros</h4>
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreChange(genre)}
                      />
                      <label
                        htmlFor={`genre-${genre}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Artist Filters */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">Artistas</h4>
                  {artists.map((artist) => (
                    <div key={artist} className="flex items-center space-x-2">
                      <Checkbox
                        id={`artist-${artist}`}
                        checked={selectedArtists.includes(artist)}
                        onCheckedChange={() => handleArtistChange(artist)}
                      />
                      <label
                        htmlFor={`artist-${artist}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {artist}
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedGenres([])
                      setSelectedArtists([])
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAlbums.map((album) => (
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
                    <span className="font-bold text-lg text-primary">${album.price}</span>
                    <Link href={`/album/${album.id}`}>
                      <Button className="bg-black hover:bg-gray-800 text-white">Ver Álbum</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No se encontraron álbumes</h3>
              <p className="text-gray-600 mb-6">Intenta ajustar tus filtros o criterios de búsqueda</p>
              <Button
                onClick={() => {
                  setSelectedGenres([])
                  setSelectedArtists([])
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
