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

const BookingItem = () => {
  // TODO: Change this to API GET logic
  const isScheduled: boolean = false;

  if (isScheduled) {
    return (
      <Card className="p-0 h-full md:h-3/4">
        <CardContent className="py-0 px-0 flex flex-row justify-between h-full">
          <div className="p-5 flex flex-col gap-2 justify-center">
            <Badge className="w-fit bg-[#fa4b005b] text-primary hover:bg-[#fa4b005b]">
              Confirmado
            </Badge>
            <h2>Corte de Cabelo</h2>
            <div className="flex flex-row gap-2 items-center">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  className=""
                  src={
                    "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                  }
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <h2 className="text-sm text-muted-foreground">vintage Barber</h2>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-5 border-l-2 ">
            <p className="text-sm">Fevereiro</p>
            <p className="text-2xl">06</p>
            <p className="text-sm">09:45</p>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="p-0 h-full md:h-3/4">
        <CardContent className="py-0 px-0 flex flex-row justify-center h-full">
          <div className="p-5 flex flex-col gap-2 justify-center">
            <div className="flex flex-col gap-2 items-center">
              <h2 className="text-sm text-muted-foreground">
                Você não tem agendamentos futuros.
              </h2>
              <Button variant="default" className="text-xs font-light p-2">
                <Link className="p-2" href="/favorites">Agendar agora</Link><ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default BookingItem;
