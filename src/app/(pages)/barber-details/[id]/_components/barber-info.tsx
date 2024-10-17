'use client';
import { Button } from "@/app/_components/ui/button";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { calculateStarRating } from "@/app/_lib/utils";
import { Ibarber } from "@/app/types/generic";
import { ChevronLeft, MapPin, Menu, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BarberInfo = ({ params }: { params: { id: string } }) => {
   const router = useRouter();
   const [barber, setBarber] = useState<Ibarber | undefined>();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState<string | undefined>();

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
                  <div className="flex flex-row gap-2 items-center">
                     <MapPin size={18} className="text-primary" />
                     {barber.address?.neighborhood ?? 'Sem endereço disponível'}
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                     <Star size={18} className="text-primary" />
                     {barber.Rating.rating && barber.Rating.appraiser
                        ? `${calculateStarRating(barber.Rating.rating, barber.Rating.appraiser)} (${barber.Rating.appraiser} avaliações)`
                        : 'Sem avaliações'}
                  </div>
               </div>
               <div className="border-b" />
            </div>
         )}
      </div>
   );
};

export default BarberInfo;
