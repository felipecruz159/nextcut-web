import { axiosInstance } from "@/app/_helpers/axios-instance";

type BookingsProps = {
    email?: string
}

export const getBookings = async ({ email }: BookingsProps) => {
    try {
        const response = await axiosInstance.get(`/get-bookings`, {
            params: { email: email },
        });
        return response.data.bookings;
    } catch(err){
        console.error("Error getting bookings:", err);
        throw err;
    }
}