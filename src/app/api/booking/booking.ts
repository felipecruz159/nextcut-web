import { axiosInstance } from "@/app/_helpers/axios-instance";
import { AxiosError } from "axios";

interface BookingPayload {
   barberShopId: string;
   serviceId: string;
   userId: string | undefined;
   status: string;
   time: string;
   date: Date;
   paymentMethod: string;
   isSpecial: boolean;
   serviceLocation: "local" | "domicile";
}

export const booking = async (bookingPayload: BookingPayload) => {
   try {
      const res = await axiosInstance.post('/bookings', bookingPayload);
      return res.data;
   } catch (err) {
      if (err instanceof AxiosError) {
         console.error("Erro na reserva:", err.response?.data || err.message);
      } else {
         console.error("Erro inesperado:", err);
      }
      throw new Error("Falha ao realizar a reserva");
   }
}

export const cancelBooking = async (bookingId: string) => {
   try {
      const response = await axiosInstance.delete(`bookings/${bookingId}`);
      return response.data; // Sucesso
   } catch (error) {
      if (error instanceof AxiosError) {
         console.error(
            "Erro ao cancelar o agendamento:",
            error.response?.data || error.message
         );
      } else {
         console.error("Erro inesperado:", error);
      }
      throw new Error("Falha ao cancelar o agendamento");
   }
};



