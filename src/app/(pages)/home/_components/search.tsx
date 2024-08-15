'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Isession } from '@/app/types/client/typesClient';

const Search = () => {
   const [sessionData, setSessionData] = useState<Isession | null>(null);
   const { data: session, status } = useSession();

   useEffect(() => {
      if (status === 'authenticated' && session?.user) {
         setSessionData({
            user: {
               name: session.user.name ?? null,
               email: session.user.email ?? null,
               image: session.user.image ?? null,
            }
         });
      } else {
         setSessionData(null);
      }
   }, [session, status]);

   return (
      <div className="flex flex-col gap-6">
         <div className="flex flex-col">
            {sessionData && sessionData.user && sessionData.user.name ? (
               <h2 className="text-xl font-light">Olá, {sessionData.user.name}!</h2>
            ) : (
               <h2 className="text-xl font-light">Olá!</h2>
            )}

            <div className="flex">
               <div>
                  <p className="text-muted-foreground text-sm capitalize">
                     {format(new Date(), "iii", {
                        locale: ptBR,
                     })}
                  </p>
               </div>
               <div>
                  <p className="text-muted-foreground text-sm">
                     {format(new Date(), "',' d 'de' MMMM", {
                        locale: ptBR,
                     })}
                  </p>
               </div>
            </div>
         </div>

         <div>
            <div className="flex flex-row items-center gap-2">
               <Input placeholder="Busque por uma barbearia..." />
               <Button className="bg-primary px-3">
                  <SearchIcon />
               </Button>
            </div>
         </div>
      </div>
   );
};

export default Search;
