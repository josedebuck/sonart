"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Eye } from "lucide-react"

type Artwork = {
  id: string
  title: string
  artist: string
  price: number
  category: string
  imageUrl: string
  dimensions: string
  year: number
}

export function FeaturedArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchArtworks = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setArtworks([
        {
          id: "1",
          title: "Sinfonía en Azul",
          artist: "María González",
          price: 1200,
          category: "Abstracto",
          imageUrl: "/placeholder.svg?height=400&width=300",
          dimensions: "80x60 cm",
          year: 2023,
        },
        {
          id: "2",
          title: "Atardecer en la Montaña",
          artist: "Carlos Ruiz",
          price: 850,
          category: "Paisajes",
          imageUrl: "/placeholder.svg?height=400&width=300",
          dimensions: "70x50 cm",
          year: 2023,
        },
        {
          id: "3",
          title: "Retrato de la Melancolía",
          artist: "Ana Martín",
          price: 2100,
          category: "Retratos",
          imageUrl: "/placeholder.svg?height=400&width=300",
          dimensions: "90x70 cm",
          year: 2022,
        },
        {
          id: "4",
          title: "Geometría Urbana",
          artist: "David López",
          price: 950,
          category: "Contemporáneo",
          imageUrl: "/placeholder.svg?height=400&width=300",
          dimensions: "60x60 cm",
          year: 2023,
        },
        {
          id: "5",
          title: "Flores de Primavera",
          artist: "Elena Vega",
          price: 680,
          category: "Naturaleza",
          imageUrl: "/placeholder.svg?height=400&width=300",
          dimensions: "50x40 cm",
          year: 2023,
        },
        {
          id: "6",
          title: "Reflexiones Nocturnas",
          artist: "Miguel Torres",
          price: 1500,
          category: "Abstracto",
          imageUrl: "/placeholder.svg?height=400&width=300",
          dimensions: "100x80 cm",
          year: 2022,
        },
      ])

      setLoading(false)
    }

    fetchArtworks()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork) => (
        <Card key={artwork.id} className="overflow-hidden art-card-hover group border-2 hover:border-primary">
          <div className="relative">
            <div className="relative h-80">
              <Image
                src={artwork.imageUrl || "/placeholder.svg"}
                alt={artwork.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-white">{artwork.category}</Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Link href={`/artwork/${artwork.id}`}>
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
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{artwork.title}</h3>
            <p className="text-gray-600 mb-2">por {artwork.artist}</p>
            <p className="text-sm text-gray-500 mb-4">
              {artwork.dimensions} • {artwork.year}
            </p>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex justify-between items-center">
            <span className="font-bold text-2xl text-primary">€{artwork.price.toLocaleString()}</span>
            <Link href={`/artwork/${artwork.id}`}>
              <Button className="bg-black hover:bg-gray-800 text-white">Ver Detalles</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
