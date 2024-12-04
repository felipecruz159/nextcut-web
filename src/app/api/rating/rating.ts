import { axiosInstance } from "@/app/_helpers/axios-instance";
import { AxiosError } from "axios";

interface RatingProps {
    comment?: string | null;
    rating: number | null;
    bookingId: string
}

export const rating = async (rating: RatingProps) => {
    try {
        const res = await axiosInstance.post('/ratings', rating);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error("Erro na avaliação:", err.response?.data || err.message);
        } else {
            console.error("Erro inesperado:", err);
        }
        throw new Error("Falha ao realizar a avaliação");
    }
};
