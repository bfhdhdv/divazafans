'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Send } from 'lucide-react'

interface Message {
  id: number
  sender: 'user' | 'creator'
  content: string
  timestamp: string
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const conversationId = params.id
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'creator',
      content: '¡Hola! Gracias por escribirme 💎',
      timestamp: new Date(Date.now() - 5 * 60000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const autoReplyMessages = [
    '¡Me alegra que estés aquí! 🌟',
    'Gracias por tu apoyo 💕',
    '¡Nuevo contenido exclusivo pronto! 🎉',
    '¿Quieres ver mi contenido premium? ✨',
  ]

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    const now = new Date()
    const userMessage: Message = {
      id: Math.max(...messages.map(m => m.id), 0) + 1,
      sender: 'user',
      content: newMessage,
      timestamp: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsLoading(true)

    // Simulate creator auto-reply after 1 second
    setTimeout(() => {
      const randomReply = autoReplyMessages[Math.floor(Math.random() * autoReplyMessages.length)]
      const replyTime = new Date(Date.now() + 1000)
      const creatorMessage: Message = {
        id: Math.max(...messages.map(m => m.id), 0) + 2,
        sender: 'creator',
        content: randomReply,
        timestamp: replyTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, creatorMessage])
      setIsLoading(false)
    }, 1000)
  }

  const creator = {
    name: `Creator ${conversationId}`,
    avatar: `https://i.pravatar.cc/150?img=${parseInt(conversationId) % 12 + 1}`,
    online: true,
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4 flex items-center gap-4">
        <Link href="/messages" className="text-zinc-400 hover:text-gold transition" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            {creator.online ? '🟢 En línea' : '⚪ Desconectado'}
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
              className={`max-w-xs px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'text-black'
                  : 'bg-zinc-800 text-white'
              }`}
              style={{
                backgroundColor: message.sender === 'user' ? '#d4af37' : undefined,
              }}
            >
              <p className="break-words">{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-black/60' : 'text-zinc-400'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-white px-4 py-3 rounded-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
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
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            className="p-3 rounded-lg font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#d4af37' }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
