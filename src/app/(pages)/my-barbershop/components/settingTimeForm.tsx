import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { registerTimeService } from "@/app/api/professional/time";
import { toast } from "sonner";

const SettingTime = ({ barbershopId }: { barbershopId: string }) => {
   const { register, handleSubmit, formState: { errors } } = useForm<{
      startTime: string;
      endTime: string;
      intervalMinutes: number;
   }>();

   const onSubmit = async (data: { startTime: string; endTime: string; intervalMinutes: number }) => {
      try {
         const response = await registerTimeService(barbershopId, data.startTime, data.endTime, data.intervalMinutes);

         if (response.status === 200) {
            toast.success("Configuração salva com sucesso!");
         } else {
            toast.error("Erro ao salvar configuração.");
         }
      } catch (error) {
         console.error("Erro ao comunicar com a API:", error);
         toast.error(`Erro: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
            <label>Horário de Início:</label>
            <Input
               type="time"
               {...register("startTime", { required: "Horário de início é obrigatório" })}
            />
            {errors.startTime && <span className="text-red-500">{errors.startTime.message}</span>}
         </div>
         <div>
            <label>Horário de Término:</label>
            <Input
               type="time"
               {...register("endTime", { required: "Horário de término é obrigatório" })}
            />
            {errors.endTime && <span className="text-red-500">{errors.endTime.message}</span>}
         </div>
         <div>
            <label>Intervalo (minutos):</label>
            <Input
               type="number"
               {...register("intervalMinutes", { required: "Intervalo é obrigatório" })}
            />
            {errors.intervalMinutes && <span className="text-red-500">{errors.intervalMinutes.message}</span>}
         </div>

         <Button type="submit" className="w-full">Salvar Configuração</Button>
      </form>
   );
};

export default SettingTime;
