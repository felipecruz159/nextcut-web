import { axiosInstance } from "@/app/_helpers/axios-instance";
import { IemailCheckProfessional } from "@/app/types/client/typesClient";

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
export const registerProfessionalApi = async (data: FormData): Promise<void> => {
   try {
      const formDataObject: { [key: string]: any } = {};
      data.forEach((value, key) => {
         formDataObject[key] = value;
      });

      await axiosInstance.post(`/register-professional`, data, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
   } catch (error) {
      console.error("Erro ao criar usuário!", error);
      throw error;
   }
};


