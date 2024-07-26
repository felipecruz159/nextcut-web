'use client'
import { Button } from "@/app/_components/ui/button";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { ChevronLeft, MapPin, Menu, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BarberInfo = ({ params }: { params: string }) => {

   interface Barber {
      id: string;
      name: string;
      address: string;
      imageUrl: string;
   }

   const router = useRouter();
   const [barber, setBarber] = useState<Barber | undefined>();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState<string | undefined>();

   useEffect(() => {
      if (params) {
         setLoading(true);
         axiosInstance.get(`/barberDetails/${params}`)
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
   }, [params]); // Dependency on params.id ensures useEffect runs when id changes

   if (isLoading) {
      // TODO: create page for loading
      return <p>Loading...</p>;
   }

   if (error) {
      // TODO: create page for error
      return <p>{error}</p>;
   }

   const handleBackClick = () => {
      router.replace('/');
   }

   return (
      <div>
         {barber && (
            <div>
               <div className="w-full h-[250px] relative">
                  <div className="absolute z-10 top-3 left-4 ">
                     <Button onClick={handleBackClick} variant={'secondary'} className="px-3 py-5" ><ChevronLeft strokeWidth={2} size={24} /></Button>
                  </div>
                  <div className="absolute z-10 top-3 right-4 ">
                     <Button variant={'secondary'} className="px-3 py-5" ><Menu strokeWidth={2} size={24} /></Button>
                  </div>

                  <Image src={barber.imageUrl} fill alt={barber.name} className='object-cover opacity-85' />
               </div>
               <div className="px-6 py-4">
                  <h2 className="text-xl mb-2">{barber.name}</h2>
                  <div className="flex flex-row gap-2 items-center">
                     <MapPin size={18} className="text-primary" />
                     {barber.address}
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                     <Star size={18} className="text-primary" />
                     5,0 (351 avaliações)
                  </div>
               </div>
               <div className="border-b " />
            </div>
         )}
      </div>
   );
}

export default BarberInfo;