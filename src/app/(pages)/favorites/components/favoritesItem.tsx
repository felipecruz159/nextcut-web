import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/app/_components/ui/tooltip";
import { Star } from "lucide-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/user";
import { checkIfFavorited, saveFavorite } from "@/app/api/professional/favorites";
import { imagebarberShop } from "@/app/_helpers/axios-instance";

const BarberInfo = ({ barberName, barbershopName }: any) => (
   <div>
      <div className="flex items-center gap-1">
         <div>{barberName}</div>
      </div>
      <div className="text-sm text-muted-foreground">{barbershopName}</div>
   </div>
);

const Rating = ({ baberShopImage }: { baberShopImage?: string }) => (
   <div className="flex flex-col items-center gap-1">
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>
               <Avatar className="h-14 w-14 border-2 transform transition-transform duration-300 hover:scale-105">
                  <AvatarImage src={`${imagebarberShop.defaults.baseURL}${baberShopImage}`} className="object-cover placeholder-opacity-75 rounded-t-lg" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
            </TooltipTrigger>
            <TooltipContent>
               <p>Avaliação baseada em 20 avaliações</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
      <div className="text-xs text-muted-foreground flex items-center gap-1">
         4,7 <Star size={10} className="h-4 w-4 fill-primary text-primary" />
      </div>
   </div>
);

const FavoritesItem = ({ barberName, barbershopName, barberId, baberShopImage }: any) => {
   const [isFavorited, setIsFavorited] = useState(false);
   const { user } = useUser();
   const router = useRouter();

   const verifyFavorite = async () => {
      if (!user) return;
      try {
         const response = await checkIfFavorited(user.id, barberId);
         setIsFavorited(response.favorited);
      } catch (error) {
         console.error("Erro ao verificar se o barbeiro está favoritado:", error);
      }
   };

   useEffect(() => {
      verifyFavorite();
   }, [user]);

   const toggleFavorite = async () => {
      if (!user) return;
      try {
         const response = await saveFavorite(user.id, barberId);
         setIsFavorited(response.favorited);
      } catch (error) {
         console.error("Erro ao alterar o favorito:", error);
      }
   };

   const handleBarberDetails = () => {
      router.push(`barber-details/${barberId}`);
   };

   return (
      <Card className="border-none">
         <CardContent className="border-b-2 py-4">
            <div className="flex gap-2 mt-5 justify-between items-center">
               <div className="flex gap-2">
                  <Rating baberShopImage={baberShopImage} />
                  <BarberInfo barberName={barberName} barbershopName={barbershopName} />
               </div>
               <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full" onClick={toggleFavorite}>
                     <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: isFavorited ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                     >
                        {isFavorited ? (
                           <FaHeart color="red" size={24} />
                        ) : (
                           <FaRegHeart className="text-muted-foreground" size={24} />
                        )}
                     </motion.div>
                  </Button>
                  <Button onClick={handleBarberDetails}>Agendar</Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};

export default FavoritesItem;
