"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({children}: {children: React.ReactNode}) {

    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </QueryClientProvider>
    )
}