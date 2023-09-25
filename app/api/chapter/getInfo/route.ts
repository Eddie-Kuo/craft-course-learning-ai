import { NextResponse } from "next/server";

const sleep = async () =>
  new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 4000);
  });

export async function POST(request: Request) {
  try {
    await sleep();
    return NextResponse.json({ message: "hello" });
  } catch (error) {}
}
