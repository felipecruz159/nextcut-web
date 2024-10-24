'use client';

import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './user';
export function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
   return (
      <SessionProvider>
         <UserProvider>{children}</UserProvider>
      </SessionProvider>
   );
}
