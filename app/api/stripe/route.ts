import getSession from "@/lib/actions/getSession";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // check for valid user
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Find the current subscription for the user

    // a. User will be able to cancel their current subscription if they have one

    // b. User will be able to subscribe if they aren't already
  } catch (error) {}
}
