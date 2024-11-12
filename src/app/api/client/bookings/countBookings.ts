import { axiosInstance } from "@/app/_helpers/axios-instance";
import { BookingsProps } from "@/app/types/BookingsProps";

export const countBookings = async ({ email }: BookingsProps) => {
    try {
        const response = await axiosInstance.get(`/count-bookings`, {
            params: { email: email },
        });
        return response.data;
    } catch(err){
        console.error("Error getting bookings:", err);
        throw err;
    }
}