import { axiosInstance } from "@/app/_helpers/axios-instance";

export const fetchBarbershops = async () => {
   try {
      const res = await axiosInstance.get('/barbershop/');
      return res.data;
   } catch (err) {
      console.error("Failed to fetch barbershops:", err);
      throw new Error("Failed to fetch barbershops");
   }
};

export const countBarbershops = async () => {
   try {
      const res = await axiosInstance.get('/count-barbershops/');
      return res.data;
   } catch (err) {
      console.error("Failed to count barbershops:", err);
      throw new Error("Failed to count barbershops");
   }
}