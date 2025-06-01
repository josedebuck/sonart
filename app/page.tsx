import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import Image from "next/image"
import { Music, Disc, Headphones, Award, Play, Eye, Ruler } from "lucide-react"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Album } from '@/types/album'
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener álbumes destacados
  const { data: featuredAlbums } = await supabase
    .from('albums')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  // Obtener todos los álbumes
  const { data: allAlbums } = await supabase
    .from('albums')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/banner-albums.jpg" alt="Cuadros de álbumes musicales personalizados" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Cuadros de Álbumes Musicales</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Lleva tu música favorita a la pared con nuestros cuadros personalizados de álbumes. Incluye código QR de Spotify y lista de canciones.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Featured Albums */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Cuadros Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredAlbums?.map((album: Album) => (
              <Card key={album.id} className="overflow-hidden art-card-hover group border-2 hover:border-primary">
                <div className="relative">
                  <div className="relative h-80">
                    <Image
                      src={album.imageurl || "/placeholder.svg"}
                      alt={`Cuadro del álbum ${album.title} de ${album.artist}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">Destacado</Badge>
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
                    {album.tracks?.length || 0} canciones • {album.year}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <span className="font-bold text-lg text-primary">${album.price}</span>
                  <Link href={`/album/${album.id}`}>
                    <Button className="bg-black hover:bg-gray-800 text-white">Ver Cuadro</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dos Tamaños</h3>
                <p className="text-gray-600">Elige entre 20x30cm o 15x20cm para adaptarse a tu espacio</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Código QR Spotify</h3>
                <p className="text-gray-600">Escucha el álbum completo escaneando el código QR incluido</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Disc className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lista de Canciones</h3>
                <p className="text-gray-600">Incluye todas las canciones del álbum en el diseño</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Alta Calidad</h3>
                <p className="text-gray-600">Impresión profesional en papel fotográfico de alta calidad</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explora por Géneros</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/catalog?genre=pop" className="group">
              <Card className="bg-gray-900 border-gray-700 hover:border-primary transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Pop</h3>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/catalog?genre=reggaeton" className="group">
              <Card className="bg-gray-900 border-gray-700 hover:border-primary transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Reggaeton</h3>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/catalog?genre=alternative" className="group">
              <Card className="bg-gray-900 border-gray-700 hover:border-primary transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Alternative</h3>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para decorar tu espacio con música?</h2>
          <p className="text-xl mb-8 opacity-90">
            Explora nuestra colección de cuadros de álbumes y encuentra el perfecto para tu hogar
          </p>
          <Link href="/catalog">
            <Button size="lg" variant="secondary" className="text-primary font-semibold">
              Ver Colección Completa
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
