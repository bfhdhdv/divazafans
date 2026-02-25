'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageSquare, Users, CheckCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const stats = [
    { icon: Users, label: 'Suscripciones', value: '24', href: '/creators' },
    { icon: MessageSquare, label: 'Mensajes', value: '12', href: '/messages' },
    { icon: Heart, label: 'Favoritas', value: '8', href: '/creators' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-gold transition" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-900/30 border border-green-700 text-green-400 px-6 py-4 flex items-center gap-3">
          <CheckCircle size={20} />
          <span>Pago completado exitosamente. ¡Bienvenido a tu suscripción!</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Bienvenido a tu Dashboard</h1>
          <p className="text-zinc-400">Aquí puedes gestionar tus suscripciones y mensajes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Link
                key={i}
                href={stat.href}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-gold transition"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-zinc-400">{stat.label}</h3>
                  <Icon size={24} style={{ color: '#d4af37' }} />
                </div>
                <div className="text-4xl font-bold">{stat.value}</div>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/creators"
            className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-xl p-8 hover:border-gold transition"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3 className="text-2xl font-bold mb-2">Explorar Creadores</h3>
            <p className="text-zinc-400 mb-4">Descubre nuevos contenidos exclusivos</p>
            <div className="inline-block px-4 py-2 rounded-lg font-semibold text-black" style={{ backgroundColor: '#d4af37' }}>
              Ver Creadores →
            </div>
          </Link>

          <Link
            href="/messages"
            className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-xl p-8 hover:border-gold transition"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3 className="text-2xl font-bold mb-2">Mensajes</h3>
            <p className="text-zinc-400 mb-4">Comunícate con tus creadores favoritos</p>
            <div className="inline-block px-4 py-2 rounded-lg font-semibold text-black" style={{ backgroundColor: '#d4af37' }}>
              Ver Mensajes →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
