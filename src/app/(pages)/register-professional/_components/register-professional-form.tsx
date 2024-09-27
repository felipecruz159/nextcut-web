'use client'
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { RegisterProfessionalFormData } from "@/app/types/client/typesClient";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import axios from 'axios'
import { useSession } from "next-auth/react";


const RegisterProfessionalForm = () => {
   const { data: session, status } = useSession();
   const [user, setUser] = useState()
   useEffect(() => {
      { session?.user?.name }
      console.log(session?.user?.name)
   })


   const { register, control, handleSubmit, setValue, watch } = useForm<RegisterProfessionalFormData>({
      defaultValues: {
         name: "",
         phone: "",
         CEP: "",
         neighborhood: "",
         street: "",
         state: "",
         city: "",
         number: ""
      }
   });

   const [loading, setLoading] = useState(false);

   const handleSubmitData: SubmitHandler<RegisterProfessionalFormData> = async (data) => {
      const { name, phone, CEP } = data;


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
      <>
         <div>
            <div>
               <h1>Dados do estabelecimento</h1>
            </div>
            <form onSubmit={handleSubmit(handleSubmitData)} className="mt-4">

               <div className="my-2 mb-3">
                  <Label htmlFor="name">Nome Fantasia</Label>
                  <Input
                     type="text"
                     id="name"
                     placeholder="Nome Fantasia"
                     {...register("name")}
                     required
                  />
               </div>

               <div className="my-2 flex flex-col mb-3">
                  <Label htmlFor="phone" className="mb-1">Telefone</Label>
                  <Controller
                     name="phone"
                     control={control}
                     render={({ field }) => (
                        <InputMask
                           className="border border-input bg-background shadow-sm h-9 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 py-1 px-3 placeholder:text-muted-foreground"
                           mask="(99) 99999-9999"
                           {...field}
                           id="phone"
                           type="tel"
                           placeholder="(99) 99999-9999"
                           required
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
                           className="border border-input bg-background shadow-sm h-9 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 py-1 px-3 placeholder:text-muted-foreground"
                           mask="99999-999"
                           {...field}
                           id="CEP"
                           type="tel"
                           placeholder="99999-999"
                        />
                     )}
                  />
               </div>

               <div className="flex w-full gap-6 mb-3">
                  <div className="w-full">
                     <Label htmlFor="neighborhood">Bairro</Label>
                     <Input
                        disabled
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
                     />
                  </div>
               </div>
               <div className="flex w-full gap-6 mb-3">
                  <div>
                     <Label htmlFor="state">Estado</Label>
                     <Input
                        disabled
                        type="text"
                        id="state"
                        placeholder="Estado"
                        {...register("state")}
                     />
                  </div>
                  <div className="w-full">
                     <Label htmlFor="city">Cidade</Label>
                     <Input
                        disabled
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
                     disabled
                     type="text"
                     id="street"
                     placeholder="Rua"
                     {...register("street")}
                  />
               </div>

               <div className="my-2">
                  <Button className="w-full" type="submit">
                     Cadastrar
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}

export default RegisterProfessionalForm;

function useMask(arg0: { mask: string; replacement: { _: RegExp; }; }) {
   throw new Error("Function not implemented.");
}
