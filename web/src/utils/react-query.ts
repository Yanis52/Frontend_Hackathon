import { QueryClient } from "@tanstack/react-query";
import { PersistedClient, Persister } from "@tanstack/react-query-persist-client";
import { getItem, setItem, removeItem } from "localforage";

const defaultCacheKey = "react-query-cache";

function createPersister(key = defaultCacheKey): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      await setItem(key, client);
    },
    restoreClient: async () => {
      const item = await getItem<PersistedClient>(key);
      return item ?? undefined;
    },
    removeClient: async () => {
      await removeItem(key);
    },
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: Infinity,
    },
  },
});

export const persister = createPersister();
