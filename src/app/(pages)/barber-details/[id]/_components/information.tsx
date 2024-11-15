'use client'

import { searchInformationClient } from '@/app/api/professional/searchService';
import { Clock, MapPin, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { InfomationsData } from '@/app/types/generic';
import { GiConsoleController } from 'react-icons/gi';

const Information = ({ barberShopId }: { barberShopId: string }) => {
   const [information, setInformation] = useState<InfomationsData | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   const fetchInformation = async () => {
      if (!barberShopId) return;
      setIsLoading(true);
      const InformartionData = await searchInformationClient(barberShopId);
      setInformation(InformartionData.data);
      setIsLoading(false);
   };

   console.log(information)

   useEffect(() => {
      fetchInformation();
   }, [barberShopId]);

   if (isLoading) {
      return (
         <div className="flex justify-center items-center">
            <GiConsoleController className="animate-spin text-2xl" />
            <span>Carregando...</span>
         </div>
      );
   }

   return (
      <div>
         <div>
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Sobre nós</h2>
               <p>{information?.about || 'Informações não disponíveis'}</p>
            </div>
            <div className="border-b mb-4" />
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Contato</h2>
               <p className="flex items-center gap-2">
                  <Smartphone size={18} /> {information?.phone || 'Telefone não disponível'}
               </p>
            </div>
            <div className="border-b mb-4" />
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Horário de Funcionamento</h2>
               <p className="flex items-center gap-2">
                  <Clock size={18} /> {information?.operation || 'Horário não disponível'}
               </p>
            </div>
            <div className="border-b mb-4" />
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Localização</h2>
               <p className="flex items-center gap-2">
                  <MapPin size={18} /> {information?.address ? `${information.address.street} - ${information.address.number}, ${information.address.neighborhood} - ${information.address.city}` : 'Localização não disponível'}
               </p>
            </div>
         </div>
      </div>
   );
};

export default Information;
