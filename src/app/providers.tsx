"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LatlngContextProvider } from "./stores/latlng-store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <LatlngContextProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </LatlngContextProvider>
  );
}
