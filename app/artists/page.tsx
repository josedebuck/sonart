"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Music, Users } from "lucide-react"

type Artist = {
  id: string
  name: string
  genre: string
  albums: number
  imageUrl: string
  description: string
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchArtists = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setArtists([
        {
          id: "1",
          name: "Taylor Swift",
          genre: "Pop",
          albums: 4,
          imageUrl: "/placeholder.svg?height=300&width=300",
          description:
            "Cantautora estadounidense conocida por sus narrativas autobiográficas y versatilidad artística.",
        },
        {
          id: "2",
          name: "Billie Eilish",
          genre: "Alternative",
          albums: 2,
          imageUrl: "/placeholder.svg?height=300&width=300",
          description: "Artista alternativa que ha revolucionado la música pop con su estilo único y voz distintiva.",
        },
        {
          id: "3",
          name: "Bad Bunny",
          genre: "Reggaeton",
          albums: 2,
          imageUrl: "/placeholder.svg?height=300&width=300",
          description: "Pionero del reggaeton moderno y uno de los artistas latinos más influyentes del mundo.",
        },
        {
          id: "4",
          name: "PSY A",
          genre: "Hip Hop",
          albums: 1,
          imageUrl: "/placeholder.svg?height=300&width=300",
          description: "Artista de hip hop emergente con un estilo único y letras profundas.",
        },
        {
          id: "5",
          name: "Dua Lipa",
          genre: "Pop",
          albums: 1,
          imageUrl: "/placeholder.svg?height=300&width=300",
          description: "Cantante británica que ha definido el sonido del pop moderno con hits internacionales.",
        },
      ])

      setLoading(false)
    }

    fetchArtists()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Nuestros Artistas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nuestros Artistas</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600">
          Descubre a los talentosos artistas que forman parte de nuestra colección musical
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <Card key={artist.id} className="overflow-hidden art-card-hover group border-2 hover:border-primary">
            <div className="relative">
              <div className="relative h-64">
                <Image
                  src={artist.imageUrl || "/placeholder.svg"}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-white">{artist.genre}</Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="font-bold text-2xl mb-2 group-hover:text-primary transition-colors">{artist.name}</h3>
              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Music className="h-4 w-4" />
                  <span>{artist.albums} álbumes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{artist.genre}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{artist.description}</p>
              <Link href={`/catalog?artist=${artist.name.toLowerCase().replace(" ", "-")}`}>
                <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors">
                  Ver Álbumes
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
