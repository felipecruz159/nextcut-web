import { axiosInstance } from "@/app/_helpers/axios-instance";
import { BookingsProps } from "@/app/types/BookingsProps";

export const getNextBookings = async ({ email }: BookingsProps) => {
    try {
        const response = await axiosInstance.get(`/get-next-bookings`, {
            params: { email: email },
        });
        return response.data.bookings;
    } catch(err){
        console.error("Error getting bookings:", err);
        throw err;
    }
}