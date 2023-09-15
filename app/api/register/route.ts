import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Information", { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("ERROR_CREDENTIALS_REGISTER", error);
    return new NextResponse("Internal Error: Credentials Register", {
      status: 500,
    });
  }
}
