'use client';

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { IregisterProfessionalFormData } from "@/app/types/client/typesClient";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { emailCheckProfessionalApi, registerProfessionalApi } from "@/app/api/professional/register/registerProfessionalApi";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/app/_components/ui/dialog"; // Importando os componentes do Dialog

const RegisterProfessionalForm = () => {
   const { data: session } = useSession();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [isEmailAvailable, setIsEmailAvailable] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
   const router = useRouter();

   const { register, control, handleSubmit, setValue, watch, reset } = useForm<IregisterProfessionalFormData>({
      defaultValues: {
         name: "",
         phone: "",
         CEP: "", // Manter maiúsculo se assim está na interface
         neighborhood: "",
         street: "",
         state: "",
         city: "",
         number: "",
         email: "",
      },
   });


   const handleSubmitData: SubmitHandler<IregisterProfessionalFormData> = async (data) => {
      const { name, phone, email, CEP, street, number, neighborhood, city, state } = data;

      console.log("Dados enviados:", data);
      if (!name || !phone || !CEP || !number || !email || !street || !neighborhood || !city || !state) {
         setError('Todos os campos são obrigatórios');
         return;
      }

      setError(null);

      try {
         setLoading(true);
         await registerProfessionalApi(data);
         toast.success('Profissional cadastrado com sucesso!');
         reset();
         router.push('/login');
      } catch (error) {
         if (axios.isAxiosError(error) && error.response) {
            setError(error.response.data.error);
         } else {
            setError('Erro ao cadastrar usuário!');
         }
      } finally {
         setLoading(false);
      }
   };


   const checkEmail = async (email: string) => {
      if (!email) {
         setIsEmailAvailable(false);
         setError('');
         return;
      }

      setLoading(true);
      try {
         const available = await emailCheckProfessionalApi({ email });
         setIsEmailAvailable(available);
         if (!available) {
            setError('Email já cadastrado!');
            setIsEmailAvailable(false);
         } else {
            setError(null);
         }
      } catch (error) {
         console.error('Erro ao verificar o email:', error);
         setIsEmailAvailable(false);
         setIsModalOpen(true);
         setError('Erro ao verificar o email.');
      } finally {
         setLoading(false);
      }
   };

   const fetchAddress = async (cep: string) => {
      setLoading(true);
      try {
         const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
         const { bairro, logradouro, uf, localidade } = response.data;

         setValue('neighborhood', bairro);
         setValue('street', logradouro);
         setValue('state', uf);
         setValue('city', localidade);
      } catch (error) {
         console.error('Erro ao buscar endereço:', error);
      } finally {
         setLoading(false);
      }
   };

   const cepValue = watch('CEP');

   useEffect(() => {
      const formattedCep = cepValue.replace(/\D/g, '');
      if (formattedCep.length === 8) {
         fetchAddress(formattedCep);
      }
   }, [cepValue]);

   return (
      <div>
         <h1>Dados do estabelecimento</h1>
         <form onSubmit={handleSubmit(handleSubmitData)} className="mt-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="my-2 mb-3">
               <Label htmlFor="email">Email Verificado</Label>
               <Input
                  type="email"
                  id="email"
                  placeholder="Email Verificado"
                  {...register("email", { required: true })}
                  onBlur={(e) => checkEmail(e.target.value)}
                  required
               />
            </div>

            <div className="my-2 mb-3">
               <Label htmlFor="name">Nome Fantasia</Label>
               <Input
                  type="text"
                  id="name"
                  placeholder="Nome Fantasia"
                  {...register("name")}
                  required
                  disabled={!isEmailAvailable}
               />
            </div>

            <div className="my-2 flex flex-col mb-3">
               <Label htmlFor="phone" className="mb-1">Telefone</Label>
               <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                     <InputMask
                        className="border border-input bg-background shadow-sm h-9 rounded-md text-sm py-1 px-3"
                        mask="(99) 99999-9999"
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="(99) 99999-9999"
                        required
                        disabled={!isEmailAvailable}
                     />
                  )}
               />
            </div>

            <div className="my-2 flex flex-col w-[110px] mb-3">
               <Label htmlFor="CEP" className="mb-1">CEP</Label>
               <Controller
                  name="CEP"
                  control={control}
                  render={({ field }) => (
                     <InputMask
                        className="border border-input bg-background shadow-sm h-9 rounded-md text-sm py-1 px-3"
                        mask="99999-999"
                        {...field}
                        id="CEP"
                        type="tel"
                        placeholder="99999-999"
                        disabled={!isEmailAvailable}
                     />
                  )}
               />
            </div>

            <div className="flex w-full gap-6 mb-3">
               <div className="w-full">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                     disabled={!isEmailAvailable}
                     type="text"
                     id="neighborhood"
                     placeholder="Bairro"
                     {...register("neighborhood")}
                  />
               </div>
               <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                     required
                     type="text"
                     id="number"
                     placeholder="Número"
                     {...register("number")}
                     disabled={!isEmailAvailable}
                  />
               </div>
            </div>

            <div className="flex w-full gap-6 mb-3">
               <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                     disabled={!isEmailAvailable}
                     type="text"
                     id="state"
                     placeholder="Estado"
                     {...register("state")}
                  />
               </div>
               <div className="w-full">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                     disabled={!isEmailAvailable}
                     type="text"
                     id="city"
                     placeholder="Cidade"
                     {...register("city")}
                  />
               </div>
            </div>

            <div className="mb-5">
               <Label htmlFor="street">Rua</Label>
               <Input
                  disabled={!isEmailAvailable}
                  type="text"
                  id="street"
                  placeholder="Rua"
                  {...register("street")}
               />
            </div>

            <div className="my-2">
               <Button className="w-full" type="submit" disabled={loading || !isEmailAvailable}>
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
               </Button>
            </div>
         </form>

         {/* Modal de Erro */}
         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Erro</DialogTitle>
                  <DialogDescription>
                     {error}
                  </DialogDescription>
               </DialogHeader>
               <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default RegisterProfessionalForm;
