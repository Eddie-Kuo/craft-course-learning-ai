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

    // b. User's first time subscribing
  } catch (error) {}
}
