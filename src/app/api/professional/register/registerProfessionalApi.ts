import { axiosInstance } from "@/app/_helpers/axios-instance";
import { IemailCheckProfessional, IregisterProfessionalFormData } from "@/app/types/client/typesClient";

export const emailCheckProfessionalApi = async (data: IemailCheckProfessional): Promise<boolean> => {
   try {
      const response = await axiosInstance.get('/check-email', {
         params: { email: data.email },
      });
      return response.data.available;
   } catch (error) {
      console.error("Erro ao verificar o email!", error);
      throw error;
   }
};

export const registerProfessionalApi = async (data: IregisterProfessionalFormData): Promise<void> => {
   try {
      console.log(data)
      await axiosInstance.post(`/register-professional`, data);
   } catch (error) {
      console.error("Erro ao criar usuário!", error);
      throw error;
   }
};
