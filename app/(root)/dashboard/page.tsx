"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <p className=" text-red-400">Welcome to the dashboard!!</p>
      <p>{session.data?.user.name}</p>
    </div>
  );
}
