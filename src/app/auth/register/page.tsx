'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'fan' | 'creator'>('fan')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      // If session exists (email confirmation disabled), create profile now
      if (data.session && data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          full_name: name,
          role,
        })

        if (role === 'creator') {
          await supabase.from('creators').upsert({
            user_id: data.user.id,
            title: name,
          })
        }

        window.location.href = '/dashboard'
        return
      }

      // Email confirmation required
      setSuccess(true)

    } catch (err) {
      setError('Error al conectar con el servidor. Verifica tu conexión.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="mx-auto mb-4" style={{ color: '#d4af37' }} />
          <h1 className="text-3xl font-bold mb-2">¡Cuenta creada!</h1>
          <p className="text-zinc-400 mb-6">
            Te hemos enviado un email de confirmación a <strong>{email}</strong>.
            Haz clic en el enlace del email para activar tu cuenta.
          </p>
          <p className="text-zinc-500 text-sm">¿No lo ves? Revisa la carpeta de spam.</p>
          <Link href="/auth/login" className="mt-6 inline-block py-3 px-8 rounded-lg font-semibold text-black" style={{ backgroundColor: '#d4af37' }}>
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition">
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#d4af37' }}>DivazaFans</h1>
            <p className="text-xl font-semibold">Crear Cuenta</p>
            <p className="text-zinc-400 mt-1">Únete a la plataforma exclusiva</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition"
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
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition"
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
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Cuenta</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 transition ${role === 'fan' ? 'border-yellow-500 bg-yellow-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
                  <input type="radio" value="fan" checked={role === 'fan'} onChange={() => setRole('fan')} className="hidden" />
                  <span>🌟 Fan</span>
                </label>
                <label className={`flex items-center justify-center gap-2 cursor-pointer p-3 rounded-lg border-2 transition ${role === 'creator' ? 'border-yellow-500 bg-yellow-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
                  <input type="radio" value="creator" checked={role === 'creator'} onChange={() => setRole('creator')} className="hidden" />
                  <span>💎 Creadora</span>
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
              {loading ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="hover:underline" style={{ color: '#d4af37' }}>
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
