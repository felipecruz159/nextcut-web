import { axiosInstance } from "@/app/_helpers/axios-instance";

type CountBookingsProps = {
    email?: string
}

export const countBookings = async ({ email }: CountBookingsProps) => {
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