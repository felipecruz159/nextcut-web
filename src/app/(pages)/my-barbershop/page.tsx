'use client';
import { ChevronLeft, MapPin, Star, Accessibility, House } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { useUser } from "@/app/context/user";
import { useState } from "react";
import Services from "./components/services";
import Information from "./components/information";

const MyBarberShop = () => {
   const { user } = useUser();
   const [activeTab, setActiveTab] = useState<'services' | 'information'>('services');

   if (!user) {
      return <div>Carregando...</div>;
   }

   return (
      <div className="max-w-screen-md m-auto">
         <div className="w-full mt-5 h-[250px] relative">
            <div className="absolute z-10 top-3 left-4">
               <Button variant="secondary" className="px-3 py-5">
                  <ChevronLeft strokeWidth={2} size={24} />
               </Button>
            </div>
            {user.barbershops?.imageUrl ? (
               <Image
                  src={`${imagebarberShop.defaults.baseURL}${user.barbershops.imageUrl}`}
                  fill
                  alt={user.barbershops.name}
                  className='object-cover placeholder-opacity-75 rounded-t-lg'
               />
            ) : (
               <div className="h-[250px] w-full bg-stone-900 flex items-center justify-center">
                  <p>Sem imagem disponível</p>
               </div>
            )}
         </div>
         <div className="px-6 py-4">
            <h2 className="text-xl mb-2">{user.barbershops?.name}</h2>

            <div className="flex justify-between">
               <div className="sm:flex flex-col gap-2 hidden">
                  <div className="flex flex-row gap-2 items-center">
                     <MapPin size={18} className="text-primary" />
                     <p className="text-sm">{`${user.address?.neighborhood ?? 'Sem endereço disponível'}, ${user.address?.number}`}</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                     <Star size={18} className="text-primary" />
                     <p className="text-sm"></p>
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                     <Accessibility size={18} className="text-blue-400" />
                     <p className="text-sm">Atendimentos Especiais</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                     <House size={18} className="text-primary" />
                     <p className="text-sm">Atendimento á domicílio</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="border-b" />

         <div className="flex justify-start gap-2 my-4 mx-4">
            <Button
               variant={activeTab === 'services' ? 'default' : 'outline'}
               onClick={() => setActiveTab('services')}
            >
               Serviços
            </Button>
            <Button
               variant={activeTab === 'information' ? 'default' : 'outline'}
               onClick={() => setActiveTab('information')}
            >
               Informações
            </Button>
         </div>

         <div className="px-4 py-2">
            {activeTab === 'services' ? <Services /> : <Information />}
         </div>
      </div>
   );
}

export default MyBarberShop;
