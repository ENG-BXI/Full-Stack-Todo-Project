import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {ClerkProvider} from '@clerk/nextjs';
import ReactQueryProvider from './_lib/ReactQueryProvider';
import {Toaster} from 'sonner';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen! overflow-x-hidden`}>
        <ClerkProvider>
          <ReactQueryProvider>
            <>{children}</>
          </ReactQueryProvider>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
