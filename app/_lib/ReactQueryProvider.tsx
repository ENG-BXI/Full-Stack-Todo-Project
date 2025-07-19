'use client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactElement} from 'react';

const ReactQueryProvider = ({children}: {children: ReactElement}) => {
  const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}});

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
