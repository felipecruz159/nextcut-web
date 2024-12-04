"use client";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@ui/button";

import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNextBookings } from "@/app/api/client/bookings/getNextBookings";
import { useUser } from "@/app/context/user";
import { useEffect, useState } from "react";
import { Bookings } from "@/app/_components/history";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type ScreenOptions = "services" | "schedulings";

const BookingItem = () => {
  const { user } = useUser();

  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [screen, setScreen] = useState<ScreenOptions>("services");

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.email) {
        const bookingsData = await getNextBookings({ email: user.email });
        // console.log(bookingsData.combinedBookings);

        // TODO: Add loading

        let filteredBookings = bookingsData.combinedBookings;

        if (screen === "schedulings") {
          filteredBookings = bookingsData.combinedBookings.filter(
            (book: Bookings) => book.userId === user.id
          );
        }

        if (filteredBookings.length > 0) {
          setBookings(filteredBookings);
        }
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
      title: "Meu Estabelecimento",
      value: "services",
    },
    {
      title: "Meus Agendamentos",
      value: "schedulings",
    },
  ];

  const handleMenuClick = (value: ScreenOptions) => {
    setScreen(value);
    console.log("screen", screen);
  };

  const BookingMenu = () => (
    <div className="w-full border rounded-xl flex md:flex-row flex-col gap-2 p-2">
      {bookingMenuTabs.map((tab) => (
        <Button
          key={tab.value}
          variant={"secondary"}
          onClick={() => handleMenuClick(tab.value)}
        >
          {tab.title}
        </Button>
      ))}
    </div>
  );

  // FIXME: // ! Adjust frontend when change screen
  return bookings.length > 0 ? (
    <div className="h-full overflow-auto p-2 gap-1">
      {/* // ? Show price? */}
      {/* // TODO: Create a "see details" button */}

      {user?.type === "professional" && <BookingMenu />}
      {bookings.map((book, index) => (
        <Card key={index} className="p-0 my-1 h-2/4">
          <CardContent className="py-0 px-0 flex flex-row justify-between h-full">
            <div className="p-5 flex flex-col gap-2 justify-center">
              <Badge className="w-fit bg-[#fa4b005b] text-primary hover:bg-[#fa4b005b]">
                Confirmado
              </Badge>
              <h2>{book.service.name}</h2>
              <div className="flex flex-row gap-2 items-center">
                {/* // TODO: Adjust avatar image */}
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={
                      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                    }
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h2 className="text-sm text-muted-foreground">
                  {book.barbershop.name}
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-5 border-l-2">
              <p className="text-sm">
                {format(book.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(book.date, "dd")}</p>
              <p className="text-sm">
                {format(book.date, "p", { locale: ptBR })}
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
  );
};

export default BookingItem;
