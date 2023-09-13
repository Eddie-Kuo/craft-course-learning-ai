"use client";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  const session = getSession();
  console.log(session);
  return (
    <div className="flex h-screen items-center justify-center">
      <p className=" text-red-400">Welcome to the dashboard!!</p>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}
