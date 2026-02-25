'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'fan' | 'creator'>('fan')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      // Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (!authData.user) {
        setError('Registration failed')
        return
      }

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email,
        full_name: name,
        role,
      })

      if (profileError) {
        setError(profileError.message)
        return
      }

      // If creator, create creator profile
      if (role === 'creator') {
        const { error: creatorError } = await supabase.from('creators').insert({
          user_id: authData.user.id,
          title: name,
        })

        if (creatorError) {
          setError(creatorError.message)
          return
        }
      }

      router.push('/auth/login')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-gold transition">
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Crear Cuenta</h1>
            <p className="text-zinc-400">Únete a DivazaFans hoy</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-gold transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Cuenta</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    value="fan"
                    checked={role === 'fan'}
                    onChange={(e) => setRole(e.target.value as 'fan' | 'creator')}
                    className="accent-gold"
                  />
                  <span>Fan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    value="creator"
                    checked={role === 'creator'}
                    onChange={(e) => setRole(e.target.value as 'fan' | 'creator')}
                    className="accent-gold"
                  />
                  <span>Creadora</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#d4af37' }}
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-gold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
