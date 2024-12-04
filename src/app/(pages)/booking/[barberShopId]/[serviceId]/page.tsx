"use client";

import AlternativeHeader from "@/app/_components/alternativeHeader";
import { Button } from "@/app/_components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { getTimeService } from "@/app/api/professional/time";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BarberUser from "./components/barberUser";
import CalendarBooking from "./components/calendar";
import { searchServiceById } from "@/app/api/professional/searchService";
import { ServiceFormData } from "@/app/types/generic";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { useUser } from "@/app/context/user";
import { booking } from "@/app/api/booking/booking";
import { toast } from "sonner";

type Schedule = {
   id: string;
   time: string;
   available: boolean;
};

interface BookingPayload {
   barberShopId: string;
   serviceId: string;
   userId: string | undefined;
   status: string;
   time: string;
   date: Date;
   paymentMethod: string;
   isSpecial: boolean;
   serviceLocation: "local" | "domicile";
}

type Period = "manhã" | "tarde" | "noite";

const Booking = ({ params }: { params: { barberShopId: string; serviceId: string } }) => {
   const { user } = useUser();
   const { barberShopId, serviceId } = params;
   const router = useRouter();
   const [schedules, setSchedules] = useState<Schedule[]>([]);
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const [service, setService] = useState<ServiceFormData | undefined>();
   const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
   const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const { handleSubmit, control, watch, setValue } = useForm({
      defaultValues: {
         localService: "",
         domicileService: "",
         specialService: true,
      },
   });

   const formatHour = (time: string) => {
      const date = new Date(time);
      return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false });
   };

   const getPeriod = (time: string): Period => {
      const hour = new Date(time).getHours();
      if (hour < 12) return "manhã";
      if (hour < 18) return "tarde";
      return "noite";
   };

   const periods: Record<Period, Schedule[]> = {
      manhã: (schedules || []).filter((schedule) => getPeriod(schedule.time) === "manhã"),
      tarde: (schedules || []).filter((schedule) => getPeriod(schedule.time) === "tarde"),
      noite: (schedules || []).filter((schedule) => getPeriod(schedule.time) === "noite"),
   };

   useEffect(() => {
      if (barberShopId) {
         const fetchSchedules = async () => {
            const fetchedSchedules = await getTimeService(barberShopId);
            setSchedules(fetchedSchedules);
         };

         fetchSchedules();
      }
   }, [barberShopId]);

   const fetchServices = async () => {
      if (!serviceId) return;
      setIsLoading(true);
      const servicesData = await searchServiceById(serviceId);
      setService(servicesData);
      setIsLoading(false);
   };

   useEffect(() => {
      fetchServices();
   }, [serviceId]);

   const handleBooking = async (data: any) => {
      if (!selectedDate) {
         alert("Por favor, selecione uma data");
         return;
      }

      if (!selectedSchedule || !selectedSchedule.time) {
         alert("Por favor, selecione um horário");
         return;
      }

      const time = new Date(selectedSchedule.time).toISOString().split('T')[1];
      const baseDate = new Date(selectedDate);

      const scheduledDate = new Date(`${baseDate.toISOString().split('T')[0]}T${time}`);

      try {
         const bookingPayload: BookingPayload = {
            barberShopId,
            serviceId,
            userId: user?.id,
            status: "Pendente",
            time: formatHour(selectedSchedule.time),
            date: scheduledDate,
            paymentMethod: "Dinheiro",
            isSpecial: data.specialService,
            serviceLocation: data.localService === "true" ? "local" : "domicile",
         };

         const response = await booking(bookingPayload);
         console.log(response);
         toast.success("Agendado com sucesso!");
         router.push('/')
      } catch (error) {
         console.error("Erro ao fazer a reserva:", error);
         alert("Ocorreu um erro. Tente novamente.");
      }
   };

   const handleServiceChange = (name: "localService" | "domicileService", value: string) => {
      if (name === "localService" && value === "true") {
         setValue("domicileService", "");
      }
      if (name === "domicileService" && value === "true") {
         setValue("localService", "");
      }
      setValue(name, value);
   };

   return (
      <div className="w-[600px] m-auto">
         <AlternativeHeader variant="title" title="Agendamento" />
         <div className="mb-4">
            <BarberUser barberShopId={barberShopId} />
         </div>
         <div className="max-w-[700px] m-auto mb-6">
            <CalendarBooking onDateChange={setSelectedDate} />
         </div>

         <div className="mb-4">
            <div className="space-y-6">
               <h2 className="text-xl font-bold">Horários Disponíveis</h2>
               <div className="flex justify-center space-x-4">
                  {Object.keys(periods).map((period) => (
                     <Button
                        key={period}
                        variant={selectedPeriod === period ? 'default' : 'outline'}
                        onClick={() =>
                           setSelectedPeriod(selectedPeriod === period ? null : (period as Period))
                        }
                        className="capitalize min-w-fit"
                     >
                        {period}
                     </Button>
                  ))}
               </div>

               {selectedPeriod && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6 justify-items-center">
                     {periods[selectedPeriod].map((schedule: Schedule) => (
                        <Button
                           key={schedule.id}
                           onClick={() => setSelectedSchedule(schedule)}
                           disabled={!schedule.available}
                           className={`w-[70px] ${schedule.available ? '' : 'opacity-50 cursor-not-allowed'} 
                           ${selectedSchedule?.id === schedule.id ? 'bg-primary text-white' : 'bg-transparent border-primary rounded-lg border'}`}
                        >
                           {formatHour(schedule.time)}
                        </Button>
                     ))}
                  </div>
               )}

               {!selectedPeriod && (
                  <p className="text-center text-gray-500">Selecione um período para visualizar os horários.</p>
               )}
            </div>
         </div>

         <div className="mb-4">
            <h2 className="text-xl">Serviço</h2>
            {isLoading ? (
               <p>Carregando serviço...</p>
            ) : service ? (
               service.name
            ) : (
               <p>Serviço não encontrado</p>
            )}
         </div>

         <form onSubmit={handleSubmit(handleBooking)} className="mb-4">
            <h2 className="text-xl mb-2">Local do atendimento</h2>
            <div>
               <Controller
                  name="localService"
                  control={control}
                  render={({ field }) => (
                     <RadioGroup value={field.value} onValueChange={(value) => handleServiceChange('localService', value)}>
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem value="true" id="localService" />
                           <label htmlFor="localService" className="ml-2 text-sm">Atendimento no estabelecimento</label>
                        </div>
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem value="false" id="domicileService" />
                           <label htmlFor="domicileService" className="ml-2 text-sm">Domicílio — será cobrado uma taxa adicional</label>
                        </div>
                     </RadioGroup>
                  )}
               />
            </div>

            <div>
               <h2 className="text-xl mb-2">Atendimento</h2>
               <Controller
                  name="specialService"
                  control={control}
                  render={({ field }) => (
                     <div className="flex items-center">
                        <Checkbox
                           id="specialService"
                           checked={field.value}
                           onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        <label htmlFor="specialService" className="ml-2 text-sm">Atendimento Especial</label>
                     </div>
                  )}
               />
            </div>

            <Button type="submit" className="mt-4">
               Confirmar Agendamento
            </Button>
         </form>
      </div>
   );
};

export default Booking;
