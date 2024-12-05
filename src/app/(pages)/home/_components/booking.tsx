'use client';

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/app/_components/ui/avatar';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Button } from '@ui/button';
import { Badge } from '@/app/_components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/app/_components/ui/dialog';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getNextBookings } from '@/app/api/client/bookings/getNextBookings';
import { useUser } from '@/app/context/user';
import { useEffect, useState } from 'react';
import { Bookings } from '@/app/_components/history';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { cancelBooking } from '@/app/api/booking/booking';

type ScreenOptions = 'services' | 'schedulings';

const BookingItem = () => {
  const { user } = useUser();

  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [screen, setScreen] = useState<ScreenOptions>('services');
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.email) {
        setIsLoading(true); // Inicia o carregamento

        const bookingsData = await getNextBookings({ email: user.email });
        // console.log(bookingsData.combinedBookings);

        // TODO: Add loading

        let filteredBookings = bookingsData.combinedBookings;

        if (screen === 'schedulings') {
          filteredBookings = bookingsData.combinedBookings.filter(
            (book: Bookings) => book.userId === user.id
          );
        }

        if (filteredBookings.length > 0) {
          setBookings(filteredBookings);
        }

        setIsLoading(false); // Finaliza o carregamento
      } else {
        setIsLoading(false); // Finaliza o carregamento caso não tenha email
      }
    };

    fetchBookings();
  }, [user, screen]);

  type BookingMenuTabProps = {
    title: string;
    value: ScreenOptions;
  };

  const bookingMenuTabs: BookingMenuTabProps[] = [
    {
      title: 'Meu Estabelecimento',
      value: 'services',
    },
    {
      title: 'Meus Agendamentos',
      value: 'schedulings',
    },
  ];

  const handleMenuClick = (value: ScreenOptions) => {
    setScreen(value);
  };

  const handleCancel = (booking: Bookings) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking) return;

    try {
      await cancelBooking(selectedBooking.id);
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBooking.id)
      );
    } catch (error) {
      console.error('Erro ao cancelar o agendamento:', error);
    } finally {
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  const BookingMenu = () => (
    <div className="w-full border rounded-xl flex md:flex-row flex-col gap-2 p-2">
      {bookingMenuTabs.map((tab) => (
        <Button
          key={tab.value}
          variant="secondary"
          onClick={() => handleMenuClick(tab.value)}
        >
          {tab.title}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <Dialog open={isCancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirmar Cancelamento</DialogTitle>
          <div className="flex justify-center">
            <Image
              sizes="100vw"
              alt={'cancelar'}
              width={0}
              height={0}
              className="h-full w-[300px] md:w-[300px] object-cover rounded-xl"
              src={'/assets/cancelar.svg'}
            />
          </div>
          <p className="text-center mt-5 mb-5">
            Tem certeza que deseja cancelar o agendamento para o serviço{' '}
            <strong>{selectedBooking?.service.name}</strong>?
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setCancelDialogOpen(false)}
              className="mb-3"
            >
              Voltar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              className="mb-3"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {bookings.length > 0 ? (
        <div className="h-full overflow-auto p-2 gap-1">
          {user?.type === 'professional' && <BookingMenu />}
          {bookings.map((book, index) => (
            <Card key={index} className="p-0 my-1 h-full md:h-2/4">
              <CardContent className="py-0 px-0 flex flex-row justify-between h-full">
                <div className="flex flex-row justify-center items-center sm:justify-between w-full flex-wrap md:flex-nowrap ">
                  <div className="p-5 flex flex-col gap-2 justify-center">
                    <Badge className="w-fit bg-[#fa4b005b] text-primary hover:bg-[#fa4b005b]">
                      Confirmado
                    </Badge>
                    <h2>{book.service.name}</h2>
                    <div className="flex flex-row gap-2 items-center">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={
                            'https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png'
                          }
                        />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <h2 className="text-sm text-muted-foreground">
                        {book.barbershop.name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-end pb-4 pr-3">
                    <Button
                      variant="destructive"
                      onClick={() => handleCancel(book)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-5 border-l-2">
                  <p className="text-sm">
                    {format(book.date, 'MMMM', { locale: ptBR })}
                  </p>
                  <p className="text-2xl">{format(book.date, 'dd')}</p>
                  <p className="text-sm">
                    {format(book.date, 'p', { locale: ptBR })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-0 h-full md:h-3/4">
          <CardContent className="py-0 px-0 flex flex-row justify-center h-full">
            <div className="p-5 flex flex-col gap-2 justify-center">
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-sm text-muted-foreground">
                  Você não tem agendamentos futuros.
                </h2>
                <Button variant="default" className="text-xs font-light p-2">
                  <Link className="p-2" href="/favorites">
                    Agendar agora
                  </Link>
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookingItem;
