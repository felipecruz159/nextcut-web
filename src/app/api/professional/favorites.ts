import { axiosInstance } from "@/app/_helpers/axios-instance";

export const saveFavorite = async (userId: string, barbershopId: string) => {
   try {
      const response = await axiosInstance.post("/favorites", {
         userId,
         barbershopId,
      });
      return response.data;
   } catch (error) {
      console.error("Erro ao salvar favorito", error);
      throw error;
   }
};

export const checkIfFavorited = async (userId: string, barberId: string) => {
   try {
      const response = await axiosInstance.get(`/favorites/${userId}/${barberId}`);
      return response.data;
   } catch (error) {
      console.error("Erro ao verificar favorito", error);
      throw error;
   }
};
