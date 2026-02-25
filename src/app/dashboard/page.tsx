'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageSquare, Users, CheckCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

function SuccessBanner() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  if (!showSuccess) return null

  return (
    <div className="bg-green-900/30 border border-green-700 text-green-400 px-6 py-4 flex items-center gap-3">
      <CheckCircle size={20} />
      <span>¡Pago completado! Bienvenido a tu suscripción premium.</span>
    </div>
  )
}

export default function DashboardPage() {
  const stats = [
    { icon: Users, label: 'Suscripciones', value: '24', href: '/creators' },
    { icon: MessageSquare, label: 'Mensajes', value: '12', href: '/messages' },
    { icon: Heart, label: 'Favoritas', value: '8', href: '/creators' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition">
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>

      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Tu Dashboard</h1>
          <p className="text-zinc-400">Gestiona tus suscripciones y mensajes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Link key={i} href={stat.href} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-yellow-500 transition block">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-zinc-400">{stat.label}</h3>
                  <Icon size={24} style={{ color: '#d4af37' }} />
                </div>
                <div className="text-4xl font-bold">{stat.value}</div>
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/creators" className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-yellow-500 transition block">
            <h3 className="text-2xl font-bold mb-2">Explorar Creadoras</h3>
            <p className="text-zinc-400 mb-4">Descubre contenido exclusivo</p>
            <span className="inline-block px-4 py-2 rounded-lg font-semibold text-black" style={{ backgroundColor: '#d4af37' }}>
              Ver Creadoras →
            </span>
          </Link>

          <Link href="/messages" className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-yellow-500 transition block">
            <h3 className="text-2xl font-bold mb-2">Mensajes</h3>
            <p className="text-zinc-400 mb-4">Chatea con tus creadoras favoritas</p>
            <span className="inline-block px-4 py-2 rounded-lg font-semibold text-black" style={{ backgroundColor: '#d4af37' }}>
              Ver Mensajes →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
