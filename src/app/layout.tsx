import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DivazaFans - Plataforma Exclusiva de Creadores',
  description: 'La plataforma más exclusiva para seguir a tus creadores favoritos',
  openGraph: {
    title: 'DivazaFans',
    description: 'La plataforma más exclusiva para seguir a tus creadores favoritos',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
