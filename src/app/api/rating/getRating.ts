import { axiosInstance } from "@/app/_helpers/axios-instance";
import { AxiosError } from "axios";

export interface getRatingProps {
    id: string
}

export const getRating = async (rating: getRatingProps) => {
    try {
        const res = await axiosInstance.get(`/get-rating/${rating.id}`);
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
