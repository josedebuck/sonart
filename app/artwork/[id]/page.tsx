"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Share2, ShoppingCart, Ruler, Calendar, Palette, User } from "lucide-react"

type Artwork = {
  id: string
  title: string
  artist: string
  price: number
  category: string
  images: string[]
  dimensions: string
  year: number
  technique: string
  description: string
  artistBio: string
}

export default function ArtworkDetailPage() {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")
  const params = useParams()

  const artworkId = params?.id as string

  useEffect(() => {
    // Simulate API call
    const fetchArtwork = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockArtwork: Artwork = {
        id: artworkId,
        title: "Sinfonía en Azul",
        artist: "María González",
        price: 1200,
        category: "Arte Abstracto",
        images: [
          "/placeholder.svg?height=600&width=500",
          "/placeholder.svg?height=600&width=500",
          "/placeholder.svg?height=600&width=500",
          "/placeholder.svg?height=600&width=500",
        ],
        dimensions: "80x60 cm",
        year: 2023,
        technique: "Óleo sobre lienzo",
        description:
          "Una explosión de emociones plasmada en tonos azules que evocan la profundidad del océano y la vastedad del cielo. Esta obra representa la armonía entre el caos y la serenidad, donde cada pincelada cuenta una historia diferente pero complementaria.\n\nLa técnica empleada combina capas translúcidas que crean profundidad y movimiento, invitando al espectador a perderse en sus formas abstractas y descubrir nuevos elementos en cada contemplación.",
        artistBio:
          "María González es una artista contemporánea española reconocida por su trabajo en arte abstracto. Con más de 15 años de experiencia, sus obras han sido expuestas en galerías de Madrid, Barcelona y París. Su estilo único combina técnicas tradicionales con enfoques modernos.",
      }

      setArtwork(mockArtwork)
      setSelectedImage(mockArtwork.images[0])
      setLoading(false)
    }

    fetchArtwork()
  }, [artworkId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Skeleton className="h-[500px] w-full" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!artwork) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Obra no encontrada</h1>
        <p className="mb-6">La obra que buscas no existe o ha sido removida.</p>
        <Button onClick={() => window.history.back()}>Volver</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images Section */}
        <div className="space-y-4">
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden bg-gray-100">
            <Image src={selectedImage || "/placeholder.svg"} alt={artwork.title} fill className="object-contain" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {artwork.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImage === image ? "border-primary" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${artwork.title} - Vista ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <Badge className="bg-primary text-white mb-4">{artwork.category}</Badge>
            <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
            <p className="text-xl text-gray-600 mb-4">por {artwork.artist}</p>
            <div className="text-3xl font-bold text-primary mb-6">€{artwork.price.toLocaleString()}</div>
          </div>

          {/* Artwork Details */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="h-5 w-5 text-primary" />
                <span className="font-medium">Dimensiones</span>
              </div>
              <p className="text-gray-600">{artwork.dimensions}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Año</span>
              </div>
              <p className="text-gray-600">{artwork.year}</p>
            </Card>

            <Card className="p-4 col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-5 w-5 text-primary" />
                <span className="font-medium">Técnica</span>
              </div>
              <p className="text-gray-600">{artwork.technique}</p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al Carrito
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold mb-3">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{artwork.description}</p>
          </div>

          {/* Artist Info */}
          <Card className="p-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Sobre el Artista</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{artwork.artistBio}</p>
          </Card>

          {/* Shipping Info */}
          <Card className="p-6 border-2 border-primary/20">
            <h3 className="font-bold mb-3 text-primary">Información de Envío</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Envío gratuito a toda España</li>
              <li>• Embalaje especializado para obras de arte</li>
              <li>• Entrega en 3-5 días laborables</li>
              <li>• Seguro incluido hasta €5,000</li>
              <li>• Certificado de autenticidad incluido</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
