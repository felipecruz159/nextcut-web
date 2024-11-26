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
};
