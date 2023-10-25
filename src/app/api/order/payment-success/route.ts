import { headers } from "next/headers";
import Stripe from "stripe";

import { prismaClient } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new Response(JSON.stringify({ error: "No signature" }));
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );

    const lineItems = sessionWithLineItems.line_items;

    console.log(lineItems);

    await prismaClient.order.update({
      data: {
        status: "PAYMENT_CONFIRMED",
      },
      where: {
        id: session.metadata?.orderId,
      },
    });
  }

  return Response.json({ received: true });
}
