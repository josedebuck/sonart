import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowLeft, Music, Calendar, Ruler } from "lucide-react"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from "next/link"

export default async function AlbumPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const { data: album } = await supabase
    .from('albums')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!album) {
    notFound()
  }

  const whatsappMessage = `Hola, me interesa el cuadro del álbum ${album.title} de ${album.artist}. ¿Podrías darme más información?`
  const whatsappUrl = `https://wa.me/+3424424971?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Botón Volver */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Volver a la colección
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen del cuadro */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={album.imageurl}
              alt={`Cuadro del álbum ${album.title} de ${album.artist}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Información del cuadro */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">{album.title}</h1>
              <p className="text-2xl text-gray-600">por {album.artist}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white/50 backdrop-blur-sm border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Ruler className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Tamaños Disponibles</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">20x30cm</p>
                    <p className="text-gray-600">15x20cm</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Año</h3>
                  </div>
                  <p className="text-gray-600">{album.year}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/50 backdrop-blur-sm border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Music className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Lista de Canciones</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {album.tracks.map((track: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                      <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                      <span className="text-gray-700">{track}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">${album.price}</span>
                <span className="text-gray-500">por cuadro</span>
              </div>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
