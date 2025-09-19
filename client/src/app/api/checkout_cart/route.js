import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const data = await req.json();

    const line_items = data.items.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          description: item.description,
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart?canceled=true`,
        metadata: {
          orderId: data.createdOrder.id,
          address: data.createdOrder.address,
          city: data.createdOrder.city,
          name: data.createdOrder.name,
        },
      });
    } catch (stripeErr) {
      return NextResponse.json(
        { error: stripeErr.message || "Stripe session creation failed" },
        { status: stripeErr.statusCode || 500 }
      );
    }


    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { error: err.message || "Unexpected server error" },
      { status: err.statusCode || 500 }
    );
  }
}
