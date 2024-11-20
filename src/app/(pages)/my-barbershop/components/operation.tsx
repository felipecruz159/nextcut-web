'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/app/_components/ui/button";
import { useUser } from "@/app/context/user";
import SettingTime from "./settingTimeForm";
import { getTimeService } from '@/app/api/professional/time';

type Schedule = {
   id: string;
   time: string;
   available: boolean;
};

type Period = 'manhã' | 'tarde' | 'noite';

const Operation = () => {
   const { user } = useUser();
   const barberShopId = user?.barbershops?.id;

   const [schedules, setSchedules] = useState<Schedule[]>([]);
   const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null); // Atualizado

   const formatHour = (time: string) =>
      new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

   const getPeriod = (time: string): Period => {
      const hour = new Date(time).getHours();
      if (hour < 12) return 'manhã';
      if (hour < 18) return 'tarde';
      return 'noite';
   };

   const periods: Record<Period, Schedule[]> = {
      manhã: schedules.filter(schedule => getPeriod(schedule.time) === 'manhã'),
      tarde: schedules.filter(schedule => getPeriod(schedule.time) === 'tarde'),
      noite: schedules.filter(schedule => getPeriod(schedule.time) === 'noite'),
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

   if (!barberShopId) {
      return <p>Carregando informações da barbearia...</p>;
   }

   return (
      <>
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
               <div className="grid grid-cols-2 gap-4 mt-6">
                  {periods[selectedPeriod].map((schedule: Schedule) => (
                     <Button
                        key={schedule.id}
                        disabled={!schedule.available}
                        className={`w-[70px] ${schedule.available ? '' : 'opacity-50 cursor-not-allowed'}`}
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

         <div className="mt-10">
            <h2 className="text-xl font-bold">Gerar Horários</h2>
            <SettingTime barbershopId={barberShopId} />
         </div>
      </>
   );
};

export default Operation;
