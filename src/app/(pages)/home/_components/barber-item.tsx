import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import Image from "next/image";
import { Card, CardContent } from "@ui/card";
import { Star } from "lucide-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Ibarber } from "@/app/types/generic";
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { calculateStarRating } from "@/app/_lib/utils";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/user";
import { saveFavorite, checkIfFavorited } from "@/app/api/professional/favorites";

interface BarberItemProps {
   barber: Ibarber;
}

const BarberItem = ({ barber }: BarberItemProps) => {
   const route = useRouter();
   const [isFavorited, setIsFavorited] = useState(false);
   const { user } = useUser();

   const verifyFavorite = async () => {
      if (!user) return;
      try {
         const response = await checkIfFavorited(user.id, barber.id);
         setIsFavorited(response.favorited);
      } catch (error) {
         console.error("Erro ao verificar se o barbeiro está favoritado:", error);
      }
   };

   useEffect(() => {
      verifyFavorite();
   }, [user]);

   const handleBarberDetails = () => {
      route.push(`barber-details/${barber.id}`);
   };

   const toggleFavorite = async () => {
      if (!user) return;

      try {
         const response = await saveFavorite(user.id, barber.id);
         setIsFavorited(response.favorited);
      } catch (error) {
         console.error("Erro ao alterar o favorito:", error);
      }
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
                     <Star className="fill-primary text-primary" size={14} />
                     {/* {barber.Rating.rating && barber.Rating.appraiser
                        ? `${calculateStarRating(barber.Rating.rating, barber.Rating.appraiser)} `
                        : '0.0'} */}
                  </Badge>
               </div>
               <Image
                  src={`${imagebarberShop.defaults.baseURL}${barber.imageUrl}`}
                  sizes="100vw"
                  alt={barber.name}
                  width={0}
                  height={0}
                  className="h-[159px] w-[150px] md:w-[290px] object-cover rounded-xl"
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
                  <Button size={"icon"} variant={"ghost"} className="rounded-full" onClick={toggleFavorite}>
                     <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: isFavorited ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                     >
                        {isFavorited ? (
                           <FaHeart color="red" size={24} />
                        ) : (
                           <FaRegHeart color="red" size={24} />
                        )}
                     </motion.div>
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};

export default BarberItem;
