import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo-sonart.png"
                  alt="SonArt Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold">
                Son<span className="text-primary">Art</span>
              </h3>
            </div>
            <p className="mb-4 text-gray-300">
              Transformamos momentos con música excepcional. Cada álbum es una ventana a nuevas emociones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Explorar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="/catalog?genre=pop" className="text-gray-300 hover:text-white transition-colors">
                  Pop
                </Link>
              </li>
              <li>
                <Link href="/catalog?genre=reggaeton" className="text-gray-300 hover:text-white transition-colors">
                  Reggaeton
                </Link>
              </li>
              <li>
                <Link href="/catalog?genre=alternative" className="text-gray-300 hover:text-white transition-colors">
                  Alternative
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-gray-300 hover:text-white transition-colors">
                  Nuestros Artistas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone size={18} />
                <span>+34 123 456 789</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail size={18} />
                <span>info@sonart.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MapPin size={18} />
                <span>
                  Calle de la Música, 123
                  <br />
                  Madrid, España
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} SonArt. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
