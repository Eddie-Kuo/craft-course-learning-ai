import getSession from "@/lib/actions/getSession";
import prisma from "@/lib/db";
import { stripe } from "@/lib/strips";
import { NextResponse } from "next/server";

const settingsURL = process.env.NEXT_PUBLIC_URL + "/settings";

export async function GET() {
  try {
    // check for valid user
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Find the current subscription for the user
    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // a. User is already subscribed and want to access their subscription.
    if (userSubscription && userSubscription.stripeCustomerId) {
      // Create a new strip session for them to edit their subscription
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsURL,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    // b. User's first time subscribing; create a new stripe session for them as well
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsURL,
      cancel_url: settingsURL,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email ?? "",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Craft Course Learning Pro",
              description: "Unlimited course generations!",
            },
            unit_amount: 1500,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      // after the user pays at stripe, stripe will send a webhook to our api along with the user id
      // with that, we will know exactly who paid and then we can update our database accordingly
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("ERROR: Creating a Stripe Session", error);
    return new NextResponse("ERROR: Creating a Stripe Session", {
      status: 500,
    });
  }
}
