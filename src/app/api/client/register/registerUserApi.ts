import { axiosInstance } from "@/app/_helpers/axios-instance";

export const registerUserApi = async (name: string, email: string, password: string): Promise<void> => {
   try {
      await axiosInstance.post(`/register`, { name, email, password });
   } catch (error) {
      console.error("Error ao criar usuário!", error);
      throw error;
   }
};
