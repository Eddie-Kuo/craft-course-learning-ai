"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

export default function Providers({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
