"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { saveAlbum } from "@/lib/albums"

export default function AddAlbumPage() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    price: "",
    imageUrl: "",
    genre: "",
    tracks: "",
    description: "",
    artistBio: "",
  })
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login?redirectTo=/addalbum"
    }
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await saveAlbum({
        title: formData.title,
        artist: formData.artist,
        year: Number(formData.year),
        price: Number(formData.price),
        imageurl: formData.imageUrl,
        genre: formData.genre,
        tracks: formData.tracks.split('\n').map(t => t.trim()).filter(Boolean),
        description: formData.description,
        artistbio: formData.artistBio,
      })
      toast.success("Álbum agregado exitosamente")
      setFormData({
        title: "",
        artist: "",
        year: "",
        price: "",
        imageUrl: "",
        genre: "",
        tracks: "",
        description: "",
        artistBio: "",
      })
    } catch (error) {
      toast.error("Error al agregar el álbum")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Álbum</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Nombre del Álbum</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artista</Label>
                <Input
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de la Imagen</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Género</Label>
                <Input
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tracks">Lista de Canciones (una por línea)</Label>
              <Textarea
                id="tracks"
                name="tracks"
                value={formData.tracks}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Álbum</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artistBio">Biografía del Artista</Label>
              <Textarea
                id="artistBio"
                name="artistBio"
                value={formData.artistBio}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Agregar Álbum
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 