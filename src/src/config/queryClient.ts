import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000, // 30 seconds for DeFi data
            gcTime: 1_000 * 60 * 60 * 24, // 24 hours
            networkMode: 'offlineFirst',
            refetchOnWindowFocus: false,
            retry: 0,
        },
        mutations: { networkMode: 'offlineFirst' },
    }
});
