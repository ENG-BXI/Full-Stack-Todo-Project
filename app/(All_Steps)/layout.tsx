'use client';
import React, {ReactNode} from 'react';
import {SidebarProvider} from '../_Components/shadCn/sidebar';
import SideBar from '../_Components/SideBar';
import Header from '../_Components/Header';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}});

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <SideBar />
        <main className='w-screen px-3'>
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default DashboardLayout;
