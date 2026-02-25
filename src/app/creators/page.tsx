'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'

export default function CreatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Fitness', 'Música', 'Belleza', 'Gaming', 'Arte', 'Moda', 'Lifestyle', 'Educación']
  const creators = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Creator ${i + 1}`,
    category: categories[i % categories.length],
    avatar: `https://i.pravatar.cc/150?img=${(i % 12) + 1}`,
    rating: 4.8 + Math.random() * 0.2,
    subscribers: Math.floor(Math.random() * 5000) + 100,
    price: 2.99 + Math.floor(Math.random() * 4),
  }))

  const filtered = creators.filter(
    (c) =>
      (selectedCategory === '' || c.category === selectedCategory) &&
      (searchQuery === '' || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4 sticky top-0 z-40">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-gold transition">
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Explorar Creadores</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar creadores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === ''
                  ? 'text-black'
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
              style={{
                backgroundColor: selectedCategory === '' ? '#d4af37' : undefined,
              }}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === cat
                    ? 'text-black'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? '#d4af37' : undefined,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((creator) => (
            <Link
              key={creator.id}
              href={`/creators/${creator.id}`}
              className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition border border-zinc-800"
            >
              <div className="relative h-48 bg-gradient-to-b from-gold/20 to-zinc-900">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  width={150}
                  height={150}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gold"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{creator.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">
                    {creator.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={16} style={{ color: '#d4af37' }} fill="#d4af37" />
                    <span className="text-sm">{creator.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-4">{creator.subscribers.toLocaleString()} suscriptores</p>
                <button
                  className="w-full py-2 rounded-lg font-semibold text-black transition hover:opacity-90"
                  style={{ backgroundColor: '#d4af37' }}
                >
                  desde €{creator.price}/mes
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No se encontraron creadores</p>
          </div>
        )}
      </div>
    </div>
  )
}
