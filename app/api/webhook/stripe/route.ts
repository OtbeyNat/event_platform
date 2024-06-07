import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    const body = await req.text()
    const sig = req.headers.get("Stripe-Signature") as string

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
        
        console.log("event",event.type)

    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err })
    }

    // Get the ID and type
    const eventType = event.type

    // CREATE
    if (eventType === 'checkout.session.completed') {
        const { id, amount_total, metadata } = event.data.object

        const order = {
            stripeId: id,
            eventId: metadata?.eventId || '',
            buyerId: metadata?.buyerId || '',
            totalAmount: amount_total ? (amount_total / 100).toString() : '0',
            createdAt: new Date(),
        }

        const newOrder = await createOrder(order)
        return NextResponse.json({ message: 'OK', order: newOrder })
    }

    return new Response('', { status: 200 })
}