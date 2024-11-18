import { axiosInstance } from "@/app/_helpers/axios-instance";
import { AxiosError } from "axios";

export const registerTimeService = async (
   barbershopId: string,
   startTime: string,
   endTime: string,
   intervalMinutes: number
) => {
   try {
      const response = await axiosInstance.post("/settingTimeService", {
         barbershopId,
         startTime,
         endTime,
         intervalMinutes,
      });
      return response;
   } catch (error) {
      if (error instanceof AxiosError) {
         const errorMessage = error.response?.data?.message || "Erro ao salvar configuração";
         throw new Error(errorMessage);
      } else {
         throw new Error("Erro desconhecido ao salvar configuração");
      }
   }
};

export const getTimeService = async (barbershopId: string) => {
   try {
      const response = await axiosInstance.get(`/schedules/${barbershopId}`);

      if (response.status !== 200) {
         throw new Error('Erro ao buscar horários');
      }

      return response.data;
   } catch (error) {
      if (error instanceof AxiosError) {
         const errorMessage = error.response?.data?.message || "Erro ao buscar horários";
         throw new Error(errorMessage);
      } else {
         throw new Error("Erro desconhecido ao buscar horários");
      }
   }
};
