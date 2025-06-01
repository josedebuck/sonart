"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contacta con Nosotros</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600">
          ¿Tienes alguna pregunta sobre nuestros álbumes o necesitas información? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input id="lastName" placeholder="Tus apellidos" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (opcional)</Label>
                <Input id="phone" type="tel" placeholder="+34 123 456 789" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Consulta general</SelectItem>
                    <SelectItem value="artist">Información de artista</SelectItem>
                    <SelectItem value="album">Consulta sobre álbum</SelectItem>
                    <SelectItem value="collaboration">Colaboración</SelectItem>
                    <SelectItem value="technical">Soporte técnico</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Cuéntanos en qué podemos ayudarte..." rows={5} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90">Enviar Mensaje</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Otras formas de ponerte en contacto con nosotros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-gray-600">+34 91 123 45 67</p>
                  <p className="text-sm text-gray-500">Lunes a Viernes, 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">info@sonart.com</p>
                  <p className="text-gray-600">artistas@sonart.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-gray-600">
                    Calle de la Música, 123
                    <br />
                    28001 Madrid, España
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Horario de Atención</h3>
                  <p className="text-gray-600">
                    Lunes - Viernes: 9:00 - 18:00
                    <br />
                    Sábados: 10:00 - 14:00
                    <br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle>¿Eres Artista?</CardTitle>
              <CardDescription className="text-white/80">
                Si eres artista y te gustaría formar parte de nuestro catálogo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 mb-4">
                Estamos siempre buscando nuevos talentos. Envíanos tu música y nuestro equipo la evaluará.
              </p>
              <Button variant="secondary" className="text-primary">
                Enviar Demo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">¿Cómo puedo escuchar los álbumes?</h3>
                <p className="text-gray-600 text-sm">
                  Nuestro catálogo es informativo. Los enlaces a plataformas de streaming están disponibles en cada
                  álbum.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">¿Agregan nuevos álbumes regularmente?</h3>
                <p className="text-gray-600 text-sm">
                  Sí, actualizamos nuestro catálogo mensualmente con nuevos lanzamientos y descubrimientos.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">¿Puedo sugerir un artista?</h3>
                <p className="text-gray-600 text-sm">
                  ¡Por supuesto! Envíanos tus sugerencias y las evaluaremos para futuras inclusiones.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
