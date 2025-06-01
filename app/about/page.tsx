import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Users, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Sobre <span className="text-primary">SonArt</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Somos más que un catálogo musical, somos curadores de experiencias sonoras y conectores de almas a través de
          la música.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            SonArt nació en 2020 con la visión de democratizar el acceso a la música de calidad. Fundada por un grupo de
            apasionados de la música, nuestra misión es conectar a artistas talentosos con oyentes de todo el mundo.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Creemos que cada álbum tiene el poder de transformar momentos y tocar corazones. Por eso, cada disco en
            nuestra colección es cuidadosamente seleccionado por su calidad artística y su capacidad de evocar
            emociones.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Hoy, nos enorgullece trabajar con más de 50 artistas de diferentes géneros y haber llevado música
            excepcional a miles de oyentes alrededor del mundo.
          </p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=800" alt="Nuestro estudio" fill className="object-cover" />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-2 hover:border-primary transition-colors">
            <CardContent className="pt-8 pb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Calidad Musical</h3>
              <p className="text-gray-600">Seleccionamos cada álbum por su excelencia artística y valor musical</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary transition-colors">
            <CardContent className="pt-8 pb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comunidad</h3>
              <p className="text-gray-600">Fomentamos una comunidad de artistas, productores y amantes de la música</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary transition-colors">
            <CardContent className="pt-8 pb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diversidad</h3>
              <p className="text-gray-600">Celebramos la diversidad musical con artistas de todos los géneros</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary transition-colors">
            <CardContent className="pt-8 pb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pasión</h3>
              <p className="text-gray-600">Cada decisión está guiada por nuestra pasión genuina por la música</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Director Musical"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Elena Rodríguez</h3>
              <p className="text-primary font-medium mb-2">Directora Musical</p>
              <p className="text-gray-600 text-sm">
                Con más de 15 años en la industria musical, Elena lidera la curaduría de nuestra colección.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Director de Artistas"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Carlos Mendoza</h3>
              <p className="text-primary font-medium mb-2">Director de Artistas</p>
              <p className="text-gray-600 text-sm">
                Carlos se encarga de las relaciones con artistas y la expansión de nuestra red global.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Especialista en Producción"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Ana Jiménez</h3>
              <p className="text-primary font-medium mb-2">Especialista en Producción</p>
              <p className="text-gray-600 text-sm">
                Ana garantiza la calidad de audio y producción de cada álbum en nuestro catálogo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-black text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Hacer que la música excepcional sea accesible para todos, creando puentes entre artistas y oyentes, y
          transformando momentos a través de la belleza sonora.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <p className="text-gray-300">Artistas Colaboradores</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <p className="text-gray-300">Álbumes en Catálogo</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">25+</div>
            <p className="text-gray-300">Géneros Musicales</p>
          </div>
        </div>
      </div>
    </div>
  )
}
