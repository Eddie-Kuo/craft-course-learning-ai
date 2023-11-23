// check if user is already subscribed

import getSession from "./actions/getSession";
import prisma from "./db";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const checkSubscription = async () => {
  const session = await getSession();
  if (!session?.user) {
    return false;
  }

  // get user subscription
  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!userSubscription) {
    return false;
  }

  // check if subscription is active
  const isValidSubscription =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValidSubscription;
};
