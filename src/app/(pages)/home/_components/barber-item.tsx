'use client';
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import Image from "next/image";
import { Card, CardContent } from "@ui/card";
import { Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Ibarber } from "@/app/types/generic"; // Importe o tipo Barber
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { calculateStarRating } from "@/app/_lib/utils";

interface BarberItemProps {
   barber: Ibarber;
}

const BarberItem = ({ barber }: BarberItemProps) => {
   const route = useRouter();

   const handleBarberDetails = () => {
      route.push(`barber-details/${barber.id}`);
   };

   if (!barber.imageUrl) {
      return null;
   }

   return (
      <Card className="max-w-[159px] min-w-[159px] w-full md:max-w-[300px] md:min-w-[300px]">
         <CardContent className="p-1 rounded-xl">
            <div className="relative">
               <div className="absolute z-50">
                  <Badge className="flex justify-center items-center gap-1 p-1 mt-1 ml-2 bg-[#000000ce] hover:bg-[#000000ce] rounded-3xl text-xs">
                     <Star className="fill-primary text-primary" size={14} />{barber.Rating.rating && barber.Rating.appraiser
                        ? `${calculateStarRating(barber.Rating.rating, barber.Rating.appraiser)} `
                        : '0.0'}
                  </Badge>
               </div>
               <Image src={`${imagebarberShop.defaults.baseURL}${barber.imageUrl}`} sizes="100vw" alt={barber.name} width={0} height={0} className="h-[159px] w-[150px] md:w-[290px] object-cover rounded-xl"
               />
            </div>
            <div className="p-2">
               <h2 className="text-nowrap text-ellipsis overflow-hidden">{barber.name}</h2>
               {barber.address && (
                  <p className="text-muted-foreground text-xs items-center overflow-hidden text-ellipsis text-nowrap">
                     {barber.address.street}, {barber.address.number}
                  </p>
               )}
            </div>
            <div className="p-2 gap-2 grid grid-cols-3 md:grid-cols-4">
               <div className="col-span-2 md:col-span-3">
                  <Button className="w-full" onClick={handleBarberDetails} variant={"secondary"}>
                     Reservar
                  </Button>
               </div>
               <div className="flex justify-center">
                  <Button size={"icon"} variant={"ghost"} className="rounded-full">
                     <Heart size={18} />
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};

export default BarberItem;
