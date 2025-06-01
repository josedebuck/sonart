import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// Importar la instancia de supabase si es necesario (aunque createMiddlewareClient la maneja)
// import { supabase } from '@/lib/supabase' 

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Intentar obtener la sesión. Esto intentará leer la cookie.
  const { data: { session }, error } = await supabase.auth.getSession();

  // Log para depurar (mantener temporalmente)
  console.log('Middleware session check for path:', req.nextUrl.pathname, 'Session exists:', !!session);

  // Si hay error al obtener la sesión, loguear y asumir no autenticado
  if (error) {
      console.error('Middleware session error:', error);
  }

  // Redirigir al login si no hay sesión y se accede a una ruta /addpost (excepto /admin/login)
  if (!session && req.nextUrl.pathname.startsWith('/addpost')) {
    const redirectUrl = new URL('/admin/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    console.log('Middleware: No session found for protected route, redirecting to login.');
    return NextResponse.redirect(redirectUrl)
  }

  // Redirigir al panel admin si hay sesión y se intenta acceder a /admin/login
  if (session && req.nextUrl.pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/addpost', req.url))
  }

  // Continuar y asegurar que la respuesta tenga las cookies de sesión actualizadas
  // await supabase.auth.setSession(session);
  return res
}

export const config = {
  matcher: ['/addpost/:path*', '/admin/login']
} 