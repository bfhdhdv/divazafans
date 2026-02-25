'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Search } from 'lucide-react'
import { useState } from 'react'

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const conversations = [
    {
      id: 1,
      name: 'Creator 1',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Hola! Gracias por seguirme',
      timestamp: 'Hace 2m',
      unread: 3,
    },
    {
      id: 2,
      name: 'Creator 2',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: 'Nuevo contenido disponible 🎉',
      timestamp: 'Hace 1h',
      unread: 1,
    },
    {
      id: 3,
      name: 'Creator 3',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: 'Perfecto! Nos vemos luego',
      timestamp: 'Ayer',
      unread: 0,
    },
    {
      id: 4,
      name: 'Creator 4',
      avatar: 'https://i.pravatar.cc/150?img=4',
      lastMessage: 'Gracias por el apoyo',
      timestamp: 'Hace 2 días',
      unread: 0,
    },
    {
      id: 5,
      name: 'Creator 5',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: '¡Hola! ¿Cómo estás?',
      timestamp: 'Hace 3 días',
      unread: 0,
    },
  ]

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Mensajes</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filtered.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition border border-zinc-800"
            >
              <div className="relative flex-shrink-0">
                <Image
                  src={conversation.avatar}
                  alt={conversation.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                {conversation.unread > 0 && (
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black"
                    style={{ backgroundColor: '#d4af37' }}
                  >
                    {conversation.unread}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white">{conversation.name}</h3>
                <p className="text-sm text-zinc-400 truncate">{conversation.lastMessage}</p>
              </div>

              <div className="text-sm text-zinc-500 flex-shrink-0">
                {conversation.timestamp}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No se encontraron conversaciones</p>
          </div>
        )}
      </div>
    </div>
  )
}
