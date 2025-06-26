import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
export async function POST(req) {
  const body = await req.json();
  const { amount } = body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "php",
      automatic_payment_methods: { enabled: true },
    });

    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret
    }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
