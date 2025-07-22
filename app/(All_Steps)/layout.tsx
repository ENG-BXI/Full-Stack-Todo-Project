'use client';
import React, {ReactNode} from 'react';
import {SidebarProvider} from '../_Components/shadCn/sidebar';
import SideBar from '../_Components/SideBar';
import Header from '../_Components/Header';

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <SidebarProvider>
      <SideBar />
      <main className='w-screen px-3'>
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
