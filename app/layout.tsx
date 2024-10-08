import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from '../@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'JobQuest - Search for tech Jobs',
  description: 'Job application tracking system for job hunters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <ClerkProvider>
    <html lang='en' suppressHydrationWarning> 
        <body className={inter.className}>
          <Providers>
            {children}
            <Toaster />
            </Providers>
        </body>
      </html>
   </ClerkProvider>
      
    
  );
} 