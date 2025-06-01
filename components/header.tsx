"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, Lock } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-2xl md:text-3xl text-black">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image src="/images/logo-sonart.png" alt="SonArt Logo" width={48} height={48} className="object-contain" />
          </div>
          <span>
            Son<span className="text-primary">Art</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/catalog" className="hover:text-primary transition-colors font-medium">
            Catálogo
          </Link>
          <Link href="/artists" className="hover:text-primary transition-colors font-medium">
            Artistas
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors font-medium">
            Nosotros
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors font-medium">
            Contacto
          </Link>
          <Link href="/admin" className="hover:text-primary transition-colors font-medium flex items-center gap-1">
            <Lock className="h-4 w-4" />
            Admin
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/" className="flex items-center gap-3 text-xl font-bold">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/logo-sonart.png"
                    alt="SonArt Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                Son<span className="text-primary">Art</span>
              </Link>

              <div className="flex flex-col gap-4">
                <Link href="/catalog" className="flex items-center gap-2 py-2 text-lg">
                  Catálogo
                </Link>
                <Link href="/artists" className="flex items-center gap-2 py-2 text-lg">
                  Artistas
                </Link>
                <Link href="/about" className="flex items-center gap-2 py-2 text-lg">
                  Nosotros
                </Link>
                <Link href="/contact" className="flex items-center gap-2 py-2 text-lg">
                  Contacto
                </Link>
                <Link href="/admin" className="flex items-center gap-2 py-2 text-lg">
                  <Lock className="h-4 w-4" />
                  Admin
                </Link>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
