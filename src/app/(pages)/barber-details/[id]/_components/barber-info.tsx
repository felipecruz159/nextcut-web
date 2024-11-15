'use client';
import { Button } from "@/app/_components/ui/button";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { calculateStarRating } from "@/app/_lib/utils";
import { Ibarber } from "@/app/types/generic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, MapPin, Star, Accessibility, House } from "lucide-react";
import Services from "./services";
import Information from "./information";

const BarberInfo = ({ params }: { params: { id: string } }) => {
   const router = useRouter();
   const [barber, setBarber] = useState<Ibarber | undefined>();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState<string | undefined>();
   const [activeTab, setActiveTab] = useState<'services' | 'information'>('services');

   useEffect(() => {
      if (params?.id) {
         setLoading(true);
         axiosInstance.get(`/barberDetails/${params.id}`)
            .then((res) => {
               setBarber(res.data);
               setLoading(false);
            })
            .catch((err) => {
               console.error("Error fetching barber details:", err);
               setError("Failed to fetch barber details. Please try again later.");
               setLoading(false);
            });
      }
   }, [params.id]);

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (error) {
      return <p>{error}</p>;
   }

   const handleBackClick = () => {
      router.replace('/');
   };

   return (
      <div>
         {barber && (
            <div>
               <div className="w-full mt-5 h-[250px] relative">
                  <div className="absolute z-10 top-3 left-4">
                     <Button onClick={handleBackClick} variant={'secondary'} className="px-3 py-5">
                        <ChevronLeft strokeWidth={2} size={24} />
                     </Button>
                  </div>
                  {barber.imageUrl ? (
                     <Image src={`${imagebarberShop.defaults.baseURL}${barber.imageUrl}`} fill alt={barber.name} className='object-cover placeholder-opacity-75 rounded-t-lg' />
                  ) : (
                     <div className="h-[250px] w-full bg-stone-900 flex items-center justify-center">
                        <p>Sem imagem disponível</p>
                     </div>
                  )}
               </div>
               <div className="px-6 py-4">
                  <h2 className="text-xl mb-2">{barber.name}</h2>
                  <div className="flex justify-between">
                     <div className="sm:flex flex-col gap-2 hidden">
                        <div className="flex flex-row gap-2 items-center">
                           <MapPin size={18} className="text-primary" />
                           <p className="text-sm">{`${barber.address?.neighborhood ?? 'Sem endereço disponível'}, ${barber.address?.number}`}</p>
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
                  {activeTab === 'services' ? <Services barberShopId={barber.id} /> : <Information barberShopId={barber.id} />}
               </div>

            </div>
         )}
      </div>
   );
};

export default BarberInfo;
