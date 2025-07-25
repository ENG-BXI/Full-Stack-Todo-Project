'use client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactNode, useState} from 'react';

const ReactQueryProvider = ({children}: {children: ReactNode}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
