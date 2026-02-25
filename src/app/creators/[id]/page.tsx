'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, MessageCircle, Star } from 'lucide-react'

export default function CreatorProfilePage({ params }: { params: { id: string } }) {
  const creatorId = params.id
  const creator = {
    id: creatorId,
    name: `Creator ${creatorId}`,
    bio: 'Creadora de contenido exclusivo. Sigue mi contenido personalizado y especial.',
    followers: 2451,
    rating: 4.9,
    avatar: `https://i.pravatar.cc/150?img=${parseInt(creatorId) % 12 + 1}`,
  }

  const tiers = [
    { name: 'Gratis', price: 0, features: ['Posts básicos', 'Contenido limitado'] },
    { name: 'Premium', price: 2.99, features: ['Todo Premium', 'Mensajes directos', 'Contenido exclusivo'], popular: true },
    { name: 'VIP', price: 5.99, features: ['Todo Premium', 'Acceso prioritario', 'Llamadas privadas', 'Contenido VIP'] },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4 sticky top-0 z-40">
        <Link href="/creators" className="inline-flex items-center gap-2 text-zinc-400 hover:text-gold transition">
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>

      {/* Cover Section */}
      <div className="h-64 bg-gradient-to-r from-gold/10 to-zinc-900 relative">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 py-12 border-b border-zinc-800">
          {/* Avatar and Basic Info */}
          <div className="md:w-1/3">
            <Image
              src={creator.avatar}
              alt={creator.name}
              width={200}
              height={200}
              className="rounded-full border-4 mb-6 w-48 h-48 object-cover"
              style={{ borderColor: '#d4af37' }}
            />
            <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star size={20} style={{ color: '#d4af37' }} fill="#d4af37" />
                <span className="font-semibold">{creator.rating}</span>
              </div>
              <div className="text-zinc-400">{creator.followers.toLocaleString()} suscriptores</div>
            </div>
          </div>

          {/* Bio and Actions */}
          <div className="md:w-2/3">
            <p className="text-zinc-300 text-lg mb-8">{creator.bio}</p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                className="flex-1 py-3 rounded-lg font-semibold text-black transition hover:opacity-90"
                style={{ backgroundColor: '#d4af37' }}
              >
                <Heart className="inline mr-2" size={20} />
                Seguir
              </button>
              <button className="flex-1 py-3 rounded-lg font-semibold border-2 border-zinc-600 transition hover:border-gold">
                <MessageCircle className="inline mr-2" size={20} />
                Mensajear
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="py-12">
          <h2 className="text-3xl font-bold mb-8">Planes de Subscripción</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`bg-zinc-900 rounded-xl p-8 border-2 transition ${tier.popular ? 'scale-105' : ''}`}
                style={{ borderColor: tier.popular ? '#d4af37' : '#27272a' }}
              >
                {tier.popular && (
                  <div
                    className="mb-4 inline-block px-4 py-1 rounded-full text-black font-bold text-sm"
                    style={{ backgroundColor: '#d4af37' }}
                  >
                    Recomendado
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-6" style={{ color: '#d4af37' }}>
                  €{tier.price}
                  {tier.price > 0 && <span className="text-lg text-zinc-400">/mes</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div
                        className="rounded-full w-5 h-5 mt-0.5 flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#d4af37' }}
                      >
                        <span className="text-black text-sm">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-lg font-semibold text-black transition hover:opacity-90"
                  style={{ backgroundColor: '#d4af37' }}
                >
                  {tier.price === 0 ? 'Seguir Gratis' : 'Suscribirse'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Placeholder */}
        <div className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8">Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-gold/20 to-zinc-900 rounded-lg border border-zinc-800"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
