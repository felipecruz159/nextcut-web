import { axiosInstance } from "@/app/_helpers/axios-instance";

export const searchService = async (userId: string) => {
   try {
      const response = await axiosInstance.get(`services/user/${userId}`);
      return response.data;
   } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
   }
};

export const editInformation = async (barbershopId: string, payload: object) => {
   try {
      const response = await axiosInstance.put(`information/edit/${barbershopId}`, payload);
      return response;
   } catch (error) {
      console.error("Erro ao enviar informações:", error);
      throw error;
   }
};