import { axiosInstance } from "@/app/_helpers/axios-instance";
import { AxiosError } from 'axios';

export const searchService = async (userId: string) => {
   try {
      const response = await axiosInstance.get(`services/user/${userId}`);
      return response.data;
   } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
   }
};

export const searchServiceClient = async (barberShopId: string) => {
   try {
      const response = await axiosInstance.get(`services/client/${barberShopId}`);
      return response.data;
   } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
   }
};

export const searchInformationClient = async (barberShopId: string) => {
   try {
      const response = await axiosInstance.get(`information/client/${barberShopId}`);
      return response.data;
   } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
   }
};

export const deleteService = async (serviceId: string): Promise<boolean> => {
   try {
      const response = await axiosInstance.delete(`/service/delete/${serviceId}`);
      return true;
   } catch (error: any) {
      console.error("Erro ao excluir serviço:", error?.response?.data || error.message);
      return false;
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

export const editInformationWithImage = async (barbershopId: string, payload: FormData) => {
   try {
      const response = await axiosInstance.put(`/informationWithImage/edit/${barbershopId}`, payload, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      return response.data;
   } catch (error) {
      if (error instanceof AxiosError) {
         console.error('Erro da API:', error.response?.data || error.message);
      } else {
         console.error('Erro inesperado:', error);
      }
      throw error;
   }
};
