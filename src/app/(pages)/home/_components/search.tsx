'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Isession } from '@/app/types/client/typesClient';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
   const [sessionData, setSessionData] = useState<Isession | null>(null);
   const { data: session, status } = useSession();
   const search = useSearchParams();
   const [searchQuery, setSearchQuery] = useState(search ? search.get("q") : "")
   const router = useRouter();

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

   const onSearch = (e: React.FormEvent) => {
      e.preventDefault();

      const encodedSearchQuery = encodeURI(searchQuery || "");
      router.push(`/?q=${encodedSearchQuery}`);
   }

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
            <form className="flex flex-row items-center gap-2" onSubmit={onSearch}>
               <Input placeholder="Busque por uma barbearia..."
               value={searchQuery || ""}
               onChange={(e) => setSearchQuery(e.target.value)}/>
               <Button className="bg-primary px-3">
                  <SearchIcon />
               </Button>
            </form>
         </div>
      </div>
   );
};

export default Search;
