import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";

// get client ID and secrets for Github
function getGithubCredentials() {
  const clientId = process.env.GITHUB_CLIENT_ID as string;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GITHUB_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GITHUB_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

// get client ID and secrets for Google
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID as string;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Github
    GithubProvider({
      clientId: getGithubCredentials().clientId,
      clientSecret: getGithubCredentials().clientSecret,
    }),

    // Google
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        // validate passwords
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {},
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
