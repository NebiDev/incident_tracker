
'use client';
import {QueryClientProvider as ReactQueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";
import { PropsWithChildren } from "react";


const queryClient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {/* Your application components go here */}
        {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider
