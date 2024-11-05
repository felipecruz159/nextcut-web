'use client';
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/user";
import { getBarberShop, getFavorites } from "@/app/api/professional/favorites";
import FavoritesItem from "./components/favoritesItem";
import AlternativeHeader from "@/app/_components/alternativeHeader";

interface Barbershop {
   id: string;
   name: string;
   imageUrl?: string;
   phone: string;
   addressId: string;
   userId: string;
   ratingId?: string | null;
}

interface Favorite {
   id: string;
   userId: string;
   barbershopId: string;
   barbershop?: Barbershop;
}

const Favorite = () => {
   const { user } = useUser();
   const [favorites, setFavorites] = useState<Favorite[]>([]);

   const fetchFavorites = async () => {
      if (!user) return;
      try {
         const favoritesData = await getFavorites(user.id);

         const favoritesWithDetails = await Promise.all(
            favoritesData.map(async (favorite: Favorite) => {
               const barbershop = await getBarberShop(favorite.barbershopId);
               return { ...favorite, barbershop };
            })
         );

         setFavorites(favoritesWithDetails);
      } catch (error) {
         console.error("Erro ao buscar os favoritos:", error);
      }
   };

   useEffect(() => {
      fetchFavorites();
   }, [user]);

   return (
      <div className="container px-6 ">
         <AlternativeHeader variant={'logo'} />
         {favorites.length > 0 ? (
            favorites.map((favorite) => (
               <FavoritesItem
                  key={favorite.id}
                  barberName={favorite.barbershop?.name || "Nome não disponível"}
                  barbershopName={favorite.barbershop?.name || "Nome não disponível"}
                  barberId={favorite.barbershopId}
                  baberShopImage={favorite.barbershop?.imageUrl}
               />
            ))
         ) : (
            <div>Nenhum favorito encontrado.</div>
         )}
      </div>
   );
};

export default Favorite;
