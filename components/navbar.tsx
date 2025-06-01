"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { PlusCircle, LogOut, LogIn } from "lucide-react"
import Image from "next/image"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // No mostrar el botón mientras se verifica la autenticación
  if (loading) {
    return null
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Image src="/images/logo-sonart.png" alt="SonArt Logo" width={32} height={32} />
              SonArt
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/catalog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/catalog") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Catálogo
              </Link>
              <Link
                href="/artists"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/artists") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Artistas
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/about") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Nosotros
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/addpost">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Añadir álbum</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Cerrar sesión</span>
                </Button>
              </>
            ) : (
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Iniciar sesión</span>
                </Button>
              </Link>
            )}
            <Button asChild>
              <Link href="/contact">Contacto</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 