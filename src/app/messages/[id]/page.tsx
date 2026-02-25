'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Send } from 'lucide-react'

interface Message {
  id: number
  sender: 'user' | 'other'
  content: string
  timestamp: string
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const conversationId = params.id
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'other',
      content: 'Hola! Gracias por seguirme',
      timestamp: '10:30',
    },
    {
      id: 2,
      sender: 'user',
      content: 'De nada! Te amo tu contenido',
      timestamp: '10:31',
    },
    {
      id: 3,
      sender: 'other',
      content: 'Gracias! Pronto habrá contenido exclusivo para mis suscriptores',
      timestamp: '10:32',
    },
    {
      id: 4,
      sender: 'user',
      content: '¡No puedo esperar!',
      timestamp: '10:33',
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: 'other',
        content: 'Gracias por tu mensaje!',
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, response])
    }, 500)
  }

  const creator = {
    name: `Creator ${conversationId}`,
    avatar: `https://i.pravatar.cc/150?img=${parseInt(conversationId) % 12 + 1}`,
    online: Math.random() > 0.5,
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4 flex items-center gap-4">
        <Link href="/messages" className="text-zinc-400 hover:text-gold transition">
          <ArrowLeft size={20} />
        </Link>
        <Image
          src={creator.avatar}
          alt={creator.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <h1 className="font-semibold">{creator.name}</h1>
          <p className="text-xs text-zinc-400">
            {creator.online ? 'En línea' : 'Desconectado'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'text-black'
                  : 'bg-zinc-800 text-white'
              }`}
              style={{
                backgroundColor: message.sender === 'user' ? '#d4af37' : undefined,
              }}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-black/60' : 'text-zinc-400'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t border-zinc-800 p-4 bg-black/50 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition"
          />
          <button
            type="submit"
            className="p-3 rounded-lg font-semibold text-black transition hover:opacity-90"
            style={{ backgroundColor: '#d4af37' }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
