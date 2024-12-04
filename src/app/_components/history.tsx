import { useState, useEffect } from "react";
import { getBookings } from "../api/client/bookings/getBookings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Ibarber, ServiceFormData } from "../types/generic";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import RatingModal from "./ratingModal";
import { getRating } from "../api/rating/getRating";

interface HistoryProps {
  email?: string;
}

export interface Bookings {
  id: string;
  barbershopId: string;
  barbershop: Ibarber;
  serviceId: string;
  service: ServiceFormData;
  userId: string;
  status: string;
  paymentMethod: string;
  // FIXME: // ! Change date type, it probably will affect the booking.tsx component
  date: string;
}

export const History = ({ email }: HistoryProps) => {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState('');
  const [rated, setRated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (email) {
      const fetchBookings = async () => {
        try {
          const data = await getBookings({ email });
          setBookings(data);
        } catch (err) {
          console.error("Erro ao buscar reservas:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [email]);

  const handleOpenModal = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setIsModalOpen(true);
  };



  if (loading) {
    return <p>Carregando...</p>;
  }

  const verifyRating = (bookingId: string) => {
    const alreadyRated = !!getRating({ id: bookingId });
    console.log(bookingId);
    console.log(alreadyRated);
    if (alreadyRated) {
      setRated(true);
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pago":
        return { color: "#1acb44" };
      case "Pendente":
        return { color: "#e9b106" };
      case "Cancelado":
        return { color: "#cd061a" };
      default:
        return {};
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estabelecimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Método de Pagamento</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow className="whitespace-nowrap" key={booking.id} onClick={() => verifyRating(booking.id)}>
              <TableCell className="font-medium">
                {booking.barbershop.name}
              </TableCell>
              <TableCell style={getStatusStyle(booking.status)}>
                {booking.status}
              </TableCell>
              <TableCell>
                {format(new Date(booking.date), "p, dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell>{booking.paymentMethod}</TableCell>
              <TableCell>{booking.service.name}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(booking.service.price)}
              </TableCell>
              <TableCell className="text-muted-foreground" >
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      {booking.status === 'Pago' && !rated && (
                        <DropdownMenuItem onClick={() => handleOpenModal(booking.id)}>
                          <span>Avaliar</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <span>Ver detalhes</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <RatingModal open={isModalOpen} onOpenChange={setIsModalOpen} bookingId={selectedBooking} />
    </>
  );
};

export default History;
