'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Star, Lock, Users, Zap } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold" style={{ color: '#d4af37' }}>
              DivazaFans
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex gap-8 items-center">
              <Link href="#" className="hover:text-gold transition">
                Explorar
              </Link>
              <Link href="#pricing" className="hover:text-gold transition">
                Precios
              </Link>
              <Link href="/auth/login" className="hover:text-gold transition">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 rounded-lg font-semibold text-black transition"
                style={{ backgroundColor: '#d4af37' }}
              >
                Registrarse
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-4">
              <Link href="#" className="block hover:text-gold transition">
                Explorar
              </Link>
              <Link href="#pricing" className="block hover:text-gold transition">
                Precios
              </Link>
              <Link href="/auth/login" className="block hover:text-gold transition">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block px-6 py-2 rounded-lg font-semibold text-black text-center transition"
                style={{ backgroundColor: '#d4af37' }}
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            La plataforma más{' '}
            <span style={{ color: '#d4af37' }}>exclusiva</span> para creadores de
            contenido
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Conecta con tus fans de forma exclusiva, privada y segura. Monetiza tu contenido
            como nunca antes.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              href="/auth/register"
              className="px-8 py-4 rounded-lg font-semibold text-black transition hover:scale-105"
              style={{ backgroundColor: '#d4af37' }}
            >
              Comenzar Ahora
            </Link>
            <Link
              href="/creators"
              className="px-8 py-4 rounded-lg font-semibold border-2 border-zinc-600 hover:border-gold transition"
              style={{ borderColor: '#d4af37' }}
            >
              Explorar Creadores
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: '50K+', sublabel: 'Fans Activos' },
            { label: '10K+', sublabel: 'Creadoras' },
            { label: '4.9★', sublabel: 'Calificación' },
            { label: '100%', sublabel: 'Privado' }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-xl text-center border border-zinc-800">
              <div className="text-4xl font-bold mb-2" style={{ color: '#d4af37' }}>
                {stat.label}
              </div>
              <div className="text-zinc-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-black to-zinc-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Cómo Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Crea tu Perfil', desc: 'Registrate en segundos y sube tu contenido exclusivo' },
              { num: '02', title: 'Conecta con Fans', desc: 'Tus seguidores se subscriben para acceder a tu contenido' },
              { num: '03', title: 'Gana Dinero', desc: 'Recibe pagos directamente por cada subscripción' }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                  style={{ backgroundColor: '#d4af37', color: '#000' }}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-zinc-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Creadores Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link
                key={i}
                href={`/creators/${i + 1}`}
                className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition border border-zinc-800"
              >
                <div className="relative h-48 bg-gradient-to-b from-gold/20 to-zinc-900">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${i + 1}`}
                    alt={`Creator ${i + 1}`}
                    width={150}
                    height={150}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gold"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Creator {i + 1}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">
                      {['Fitness', 'Música', 'Belleza', 'Gaming', 'Arte', 'Moda'][i]}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={16} style={{ color: '#d4af37' }} fill="#d4af37" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 rounded-lg font-semibold text-black transition hover:opacity-90"
                    style={{ backgroundColor: '#d4af37' }}
                  >
                    desde €2.99/mes
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-b from-black to-zinc-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Planes de Subscripción</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Gratis', price: '0€', color: 'border-zinc-700' },
              {
                name: 'Premium',
                price: '2.99€',
                color: '#d4af37',
                popular: true,
                features: ['Contenido Premium', 'Mensajes Directos', 'Acceso Exclusivo']
              },
              { name: 'VIP', price: '5.99€', color: 'border-zinc-700' }
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-zinc-900 rounded-xl p-8 border-2 transition ${
                  plan.popular ? 'scale-105 relative' : ''
                }`}
                style={{ borderColor: plan.color }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-black font-bold text-sm"
                    style={{ backgroundColor: '#d4af37' }}
                  >
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6" style={{ color: '#d4af37' }}>
                  {plan.price}
                </div>
                {plan.features && (
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Zap size={16} style={{ color: '#d4af37' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  className="w-full py-3 rounded-lg font-semibold text-black transition hover:opacity-90"
                  style={{ backgroundColor: '#d4af37' }}
                >
                  {plan.name === 'Gratis' ? 'Crear Cuenta' : 'Suscribirse'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-zinc-900 to-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Comenzar?</h2>
          <p className="text-xl text-zinc-400 mb-8">
            Únete a miles de creadores que ya están ganando dinero con su contenido exclusivo
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-black transition hover:scale-105"
            style={{ backgroundColor: '#d4af37' }}
          >
            Registrarse Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold" style={{ color: '#d4af37' }}>
              DivazaFans
            </h3>
          </div>
          <div className="text-center text-zinc-500 text-sm">
            <p>© 2024 DivazaFans. Todos los derechos reservados.</p>
            <p className="mt-2">
              <Link href="#" className="hover:text-gold transition">
                Términos
              </Link>
              {' • '}
              <Link href="#" className="hover:text-gold transition">
                Privacidad
              </Link>
              {' • '}
              <Link href="#" className="hover:text-gold transition">
                Contacto
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
