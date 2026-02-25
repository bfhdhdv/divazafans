import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { priceId, creatorId, tier } = await request.json()

    // Check if Stripe is configured
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const stripe = require('stripe')(stripeKey)

    const prices: Record<string, number> = {
      premium: 299,
      vip: 599,
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: tier === 'vip' ? 'Suscripción VIP Élite' : 'Suscripción Premium',
              description: `Acceso ${tier === 'vip' ? 'VIP' : 'Premium'} al contenido exclusivo`,
            },
            unit_amount: prices[tier] || 299,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/creators/${creatorId}`,
      metadata: { creatorId, tier },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
