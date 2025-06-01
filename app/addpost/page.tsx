'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from '@/context/AuthContext'
import { Album } from '@/types/album'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, Pencil, Trash2, Star, StarOff } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    spotifyUrl: '',
    appleMusicUrl: '',
    youtubeUrl: '',
    bandcampUrl: '',
    soundcloudUrl: ''
  })

  useEffect(() => {
    console.log('Auth state:', { user, authLoading })
    if (!authLoading && !user) {
      console.log('No user found, redirecting to login')
      router.push('/admin/login')
      return
    }
    if (user) {
      console.log('User found, fetching albums')
      fetchAlbums()
    }
  }, [user, authLoading, router])

  const fetchAlbums = async () => {
    try {
      console.log('Fetching albums...')
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching albums:', error)
        throw error
      }
      console.log('Albums fetched:', data)
      setAlbums(data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
      setError('Error al cargar los álbumes')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (editingAlbum) {
        // Actualizar álbum existente
        const { error } = await supabase
          .from('albums')
          .update(formData)
          .eq('id', editingAlbum.id)

        if (error) throw error
        setSuccess('Álbum actualizado correctamente')
      } else {
        // Crear nuevo álbum
        const { error } = await supabase
          .from('albums')
          .insert([formData])

        if (error) throw error
        setSuccess('Álbum creado correctamente')
      }

      // Limpiar formulario y estado
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        spotifyUrl: '',
        appleMusicUrl: '',
        youtubeUrl: '',
        bandcampUrl: '',
        soundcloudUrl: ''
      })
      setEditingAlbum(null)
      fetchAlbums()
    } catch (error) {
      console.error('Error:', error)
      setError('Error al guardar el álbum')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (album: Album) => {
    setEditingAlbum(album)
    setFormData({
      title: album.title,
      description: album.description,
      imageUrl: album.imageUrl,
      spotifyUrl: album.spotifyUrl,
      appleMusicUrl: album.appleMusicUrl,
      youtubeUrl: album.youtubeUrl,
      bandcampUrl: album.bandcampUrl,
      soundcloudUrl: album.soundcloudUrl
    })
  }

  const handleDelete = async (albumId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este álbum?')) return

    try {
      const { error } = await supabase
        .from('albums')
        .delete()
        .eq('id', albumId)

      if (error) throw error
      setSuccess('Álbum eliminado correctamente')
      fetchAlbums()
    } catch (error) {
      console.error('Error:', error)
      setError('Error al eliminar el álbum')
    }
  }

  const handleToggleFeatured = async (album: Album) => {
    try {
      const { error } = await supabase
        .from('albums')
        .update({ featured: !album.featured })
        .eq('id', album.id)

      if (error) throw error
      setSuccess(`Álbum ${album.featured ? 'quitado de' : 'añadido a'} destacados`)
      fetchAlbums()
    } catch (error) {
      console.error('Error:', error)
      setError('Error al actualizar el estado destacado')
    }
  }

  const handleCancel = () => {
    setEditingAlbum(null)
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      spotifyUrl: '',
      appleMusicUrl: '',
      youtubeUrl: '',
      bandcampUrl: '',
      soundcloudUrl: ''
    })
  }

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      {/* Formulario de creación/edición */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingAlbum ? 'Editar Álbum' : 'Crear Nuevo Álbum'}</CardTitle>
          <CardDescription>
            {editingAlbum ? 'Modifica los detalles del álbum' : 'Completa los detalles del nuevo álbum'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de la Imagen</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spotifyUrl">URL de Spotify</Label>
                <Input
                  id="spotifyUrl"
                  value={formData.spotifyUrl}
                  onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appleMusicUrl">URL de Apple Music</Label>
                <Input
                  id="appleMusicUrl"
                  value={formData.appleMusicUrl}
                  onChange={(e) => setFormData({ ...formData, appleMusicUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">URL de YouTube</Label>
                <Input
                  id="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bandcampUrl">URL de Bandcamp</Label>
                <Input
                  id="bandcampUrl"
                  value={formData.bandcampUrl}
                  onChange={(e) => setFormData({ ...formData, bandcampUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soundcloudUrl">URL de SoundCloud</Label>
                <Input
                  id="soundcloudUrl"
                  value={formData.soundcloudUrl}
                  onChange={(e) => setFormData({ ...formData, soundcloudUrl: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertTitle>Éxito</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingAlbum ? 'Actualizar Álbum' : 'Crear Álbum'}
              </Button>
              {editingAlbum && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de álbumes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Álbumes Existentes</h2>
        {albums.length === 0 ? (
          <Alert>
            <AlertTitle>No hay álbumes</AlertTitle>
            <AlertDescription>No se han encontrado álbumes en la base de datos.</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((album) => (
              <Card key={album.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{album.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{album.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {album.imageUrl && (
                    <img
                      src={album.imageUrl}
                      alt={album.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant={album.featured ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleFeatured(album)}
                    className={album.featured ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  >
                    {album.featured ? (
                      <>
                        <Star className="h-4 w-4 mr-2" />
                        Destacado
                      </>
                    ) : (
                      <>
                        <StarOff className="h-4 w-4 mr-2" />
                        Destacar
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(album)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(album.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 