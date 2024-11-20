'use client';

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/app/_components/ui/tooltip";
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { getBarberShop } from "@/app/api/professional/favorites";
import { Ibarber } from "@/app/types/generic";

const BarberUser = ({ barberShopId }: { barberShopId: string }) => {
   const [barberShop, setBarberShop] = useState<Ibarber | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchBarberShop = async () => {
         try {
            setLoading(true);
            const data = await getBarberShop(barberShopId);
            setBarberShop(data);
         } catch (err) {
            setError("Erro ao carregar os dados do barbeiro.");
         } finally {
            setLoading(false);
         }
      };

      if (barberShopId) {
         fetchBarberShop();
      }
   }, [barberShopId]);

   if (loading) return <p>Carregando...</p>;
   if (error) return <p>{error}</p>;

   return (
      <div className="flex flex-row items-center gap-2">
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger>
                  <Avatar className="h-14 w-14 border-2 transform transition-transform duration-300 hover:scale-105">
                     <AvatarImage
                        src={`${imagebarberShop.defaults.baseURL}${barberShop?.imageUrl}`}
                        className="object-cover placeholder-opacity-75 rounded-t-lg"
                     />
                     <AvatarFallback>{barberShop?.name?.charAt(0) || ""}</AvatarFallback>
                  </Avatar>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Avaliação baseada em 0 avaliações</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <div>
            <p className="font-semibold">{barberShop?.name || "Barbearia"}</p>
            <p className="text-sm text-muted-foreground">
               {barberShop?.User?.name || "Nome não disponível"}
            </p>
         </div>
      </div>
   );
};

export default BarberUser;
