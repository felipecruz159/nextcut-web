'use client'
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '@/app/context/user';
import { Smartphone, Clock, MapPin, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Textarea } from '@/app/_components/ui/textarea';
import InputMask from 'react-input-mask';
import axios from 'axios';

const Information = () => {
   const { user } = useUser();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentStep, setCurrentStep] = useState(1);

   const [step1Data, setStep1Data] = useState({
      about: user?.barbershops?.about || '',
   });
   const [step2Data, setStep2Data] = useState({
      phone: user?.barbershops?.phone || '',
   });
   const [step3Data, setStep3Data] = useState({
      hours: user?.barbershops.operation || '',
   });
   const [step4Data, setStep4Data] = useState({
      CEP: '',
      neighborhood: user?.address?.neighborhood || '',
      street: user?.address?.street || '',
      number: user?.address?.number || '',
      state: user?.address?.state || '',
      city: user?.address?.city || '',
   });

   const { control, handleSubmit, watch, setValue, getValues } = useForm();

   const fetchAddress = async (cep: string) => {
      try {
         const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
         const { bairro, logradouro, uf, localidade } = response.data;
         setStep4Data((prevData) => ({
            ...prevData,
            neighborhood: bairro,
            street: logradouro,
            state: uf,
            city: localidade,
         }));
      } catch (error) {
         console.error('Erro ao buscar endereço:', error);
      }
   };

   const CEP = watch('CEP');
   useEffect(() => {
      if (CEP) {
         const formattedCep = CEP.replace(/\D/g, '');
         if (formattedCep.length === 8) {
            fetchAddress(formattedCep);
         }
      }
   }, [CEP]);

   const onSubmit = async (data: any) => {
      console.log('Dados finais do formulário: ', {
         ...step1Data,
         ...step2Data,
         ...step3Data,
         ...step4Data,
      });
      setIsModalOpen(false);
   };

   const renderStepContent = () => {
      switch (currentStep) {
         case 1:
            return (
               <div>
                  <DialogTitle className="mb-3">Editar Sobre Nós</DialogTitle>
                  <Controller
                     name="about"
                     control={control}
                     render={({ field }) => (
                        <Textarea
                           {...field}
                           value={step1Data.about}
                           onChange={(e) => setStep1Data({ ...step1Data, about: e.target.value })}
                           rows={5}
                           placeholder="Digite a descrição"
                        />
                     )}
                  />
               </div>
            );
         case 2:
            return (
               <div>
                  <DialogTitle className="mb-3">Editar Contato</DialogTitle>
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
                           value={step2Data.phone}
                           onChange={(e) => setStep2Data({ ...step2Data, phone: e.target.value })}
                        />
                     )}
                  />
               </div>
            );
         case 3:
            return (
               <div>
                  <DialogTitle className="mb-3">Editar Horário de Funcionamento</DialogTitle>
                  <Controller
                     name="hours"
                     control={control}
                     render={({ field }) => (
                        <Textarea
                           {...field}
                           value={step3Data.hours}
                           onChange={(e) => setStep3Data({ ...step3Data, hours: e.target.value })}
                           rows={5}
                           placeholder={`Digite o horário de funcionamento
                              
✔️ Seg - Sex: 9h - 20h | Sáb: 9h - 14h
❌ Quarta`}
                        />

                     )}
                  />
               </div>
            );
         case 4:
            return (
               <div>
                  <DialogTitle className="mb-3">Editar Localização</DialogTitle>
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
                           value={step4Data.CEP}
                           onChange={(e) => setStep4Data({ ...step4Data, CEP: e.target.value })}
                        />
                     )}
                  />
                  <Controller
                     name="neighborhood"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="Bairro"
                           value={step4Data.neighborhood}
                           onChange={(e) => setStep4Data({ ...step4Data, neighborhood: e.target.value })}
                        />
                     )}
                  />
                  <Controller
                     name="street"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="Rua"
                           value={step4Data.street}
                           onChange={(e) => setStep4Data({ ...step4Data, street: e.target.value })}
                        />
                     )}
                  />
                  <Controller
                     name="number"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="Número"
                           value={step4Data.number}
                           onChange={(e) => setStep4Data({ ...step4Data, number: e.target.value })}
                        />
                     )}
                  />
                  <Controller
                     name="state"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="Estado"
                           value={step4Data.state}
                           onChange={(e) => setStep4Data({ ...step4Data, state: e.target.value })}
                        />
                     )}
                  />
                  <Controller
                     name="city"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="Cidade"
                           value={step4Data.city}
                           onChange={(e) => setStep4Data({ ...step4Data, city: e.target.value })}
                        />
                     )}
                  />
               </div>
            );
         default:
            return null;
      }
   };

   const handleNextStep = () => {
      setCurrentStep((prev) => prev + 1);
   };

   const handlePreviousStep = () => {
      setCurrentStep((prev) => prev - 1);
   };

   return (
      <div>
         <Button className="mb-4 gap-2" variant="outline" onClick={() => setIsModalOpen(true)}>
            <Edit size={16} /> Editar Informações
         </Button>

         <div>
            {/* Informações da barbearia */}
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Sobre nós</h2>
               <p>{user?.barbershops?.about || 'Informações não disponíveis'}</p>
            </div>
            <div className="border-b mb-4" />
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Contato</h2>
               <p className="flex items-center gap-2">
                  <Smartphone size={18} /> {user?.barbershops?.phone || 'Telefone não disponível'}
               </p>
            </div>
            <div className="border-b mb-4" />
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Horário de Funcionamento</h2>
               <p className="flex items-center gap-2">
                  <Clock size={18} /> {user?.barbershops?.operation || 'Horário não disponível'}
               </p>
            </div>
            <div className="border-b mb-4" />
            <div className="mb-4">
               <h2 className="font-semibold text-lg text-muted-foreground mb-1">Localização</h2>
               <p className="flex items-center gap-2">
                  <MapPin size={18} /> {user?.address ? `${user.address.street}, ${user.address.city}` : 'Localização não disponível'}
               </p>
            </div>
         </div>



         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-2xl">
               {renderStepContent()}
               <DialogFooter>
                  {currentStep > 1 && (
                     <Button variant="outline" onClick={handlePreviousStep}>
                        Voltar
                     </Button>
                  )}
                  {currentStep < 4 ? (
                     <Button onClick={handleNextStep}>Próximo</Button>
                  ) : (
                     <Button onClick={handleSubmit(onSubmit)}>Salvar</Button>
                  )}
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default Information;