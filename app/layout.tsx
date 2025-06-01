import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sonart - Cuadros de Álbumes Musicales",
  description: "Cuadros personalizados de álbumes musicales con código QR de Spotify y lista de canciones. Disponibles en tamaños 20x30cm y 15x20cm.",
  icons: {
    icon: '/images/logo-sonart-pestaña.png',
    shortcut: '/images/logo-sonart-pestaña.png',
    apple: '/images/logo-sonart-pestaña.png',
  },
  openGraph: {
    title: 'Sonart - Cuadros de Álbumes Musicales',
    description: 'Cuadros personalizados de álbumes musicales con código QR de Spotify y lista de canciones. Disponibles en tamaños 20x30cm y 15x20cm.',
    images: ['/images/logo-sonart-pestaña.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
