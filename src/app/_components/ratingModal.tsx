import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import HalfRating from "./mui/rating";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { rating } from "../api/rating/rating";
import { toast } from "sonner";

type RatingModalProps = {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    bookingId: string;
};

const RatingModal = ({ open, onOpenChange, bookingId }: RatingModalProps) => {
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [comments, setComments] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleRatingChange = (newRating: number | null) => {
        setRatingValue(newRating);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ratingValue) {
            setError("Por favor, insira uma avaliação.");
            return;
        }

        const data = {
            bookingId,
            rating: ratingValue,
            comment: comments,
        };

        try {
            const response = await rating(data)
            console.log(response);
        } catch (err) {
            console.error(err);
        }

        toast.success('Sua avaliação foi enviada com sucesso.');
        onOpenChange(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setError(null);
            setRatingValue(null);
            setComments("");
        }
        onOpenChange(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Avaliar Serviço</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="rating">Avaliação</label>
                        <HalfRating value={ratingValue} onChange={handleRatingChange} />
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comments">Comentários</label>
                        <Textarea
                            id="comments"
                            placeholder="Escreva seus comentários"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => handleOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Enviar Avaliação</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


export default RatingModal;
