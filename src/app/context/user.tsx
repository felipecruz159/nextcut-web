'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { axiosInstance } from '../_helpers/axios-instance';

type UserType = {
   id: string;
   email: string;
   name: string;
   type: string;
   phone: string;
};

type UserContextType = {
   user: UserType | null;
   loading: boolean;
   logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error('useUser deve ser usado dentro de um UserProvider');
   }
   return context;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
   const { data: session, status } = useSession();
   const [user, setUser] = useState<UserType | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUserDetails = async () => {
         if (session?.user?.email) {
            try {
               const response = await axiosInstance.get(`/user`, {
                  params: { email: session.user.email },
               });
               if (response.data) {
                  setUser({
                     id: response.data.user.id,
                     email: response.data.user.email,
                     name: response.data.user.name,
                     type: response.data.user.type,
                     phone: response.data.user.phone,
                  })
               }
            } catch (error) {
               console.error('Erro ao buscar o tipo do usuário:', error);
            } finally {
               setLoading(false);
            }
         } else {
            setLoading(false);
         }
      };

      if (status === 'authenticated') {
         fetchUserDetails();
      } else {
         setLoading(false);
      }
   }, [session, status]);

   const logout = () => {
      signOut();
      setUser(null);
   };

   return (
      <UserContext.Provider value={{ user, loading, logout }}>
         {children}
      </UserContext.Provider>
   );
}