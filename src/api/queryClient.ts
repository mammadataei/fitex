import { QueryClient } from "@tanstack/react-query";

// Create a singleton QueryClient with default configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    //
  },
});
