import { useState } from "react";
import createRouter from "./router";
import { RouterProvider } from "react-router-dom";
import { useIsRestoring } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "@/utils/react-query";

function PersistQueryClientGate({ children }: { children: React.ReactNode }) {
  const isRestoring = useIsRestoring();
  return isRestoring ? null : children;
}

export default function App() {
  const [router] = useState(() => createRouter());

  return (
    <>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <PersistQueryClientGate>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </PersistQueryClientGate>
      </PersistQueryClientProvider>
    </>
  )
}
