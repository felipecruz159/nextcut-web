import { axiosInstance } from "@/app/_helpers/axios-instance";
import { ServiceFormData } from "@/app/types/generic";

export const registerService = async (data: ServiceFormData) => {
   try {
      const response = await axiosInstance.post('/registerService', data);
      return response.data;
   } catch (error) {
      console.error("Erro ao registrar o serviço", error);
      throw error;
   }

};
export const updateService = async (data: ServiceFormData) => {
   try {
      const response = await axiosInstance.put(`/updateService/${data.id}`, data);
      return response.data;
   } catch (error) {
      console.error("Erro ao atualizar o serviço", error);
      throw error;
   }
};

