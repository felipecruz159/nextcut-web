'use client';
import { ChevronLeft, MapPin, Star, Accessibility, House, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { imagebarberShop } from "@/app/_helpers/axios-instance";
import { useUser } from "@/app/context/user";
import { useState, useEffect } from "react";
import Services from "./components/services";
import Information from "./components/information";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { editInformationWithImage } from "@/app/api/professional/searchService";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

const MyBarberShop = () => {
   const { user, updateUser } = useUser();
   const [activeTab, setActiveTab] = useState<'services' | 'information'>('services');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const router = useRouter();
   const [formData, setFormData] = useState({
      name: '',
      specialService: false,
      homeService: false,
      file: null as File | null,
   });

   useEffect(() => {
      if (user) {
         setFormData({
            name: user.barbershops?.name ?? '',
            specialService: user.barbershops?.specialService ?? false,
            homeService: user.barbershops?.homeService ?? false,
            file: null,
         });
      }
   }, [user]);

   if (!user) {
      return <div>Carregando...</div>;
   }

   const handleSave = async () => {
      try {
         const formDataToSend = new FormData();

         formDataToSend.append('name', formData.name);
         formDataToSend.append('specialService', String(formData.specialService));
         formDataToSend.append('homeService', String(formData.homeService));

         if (formData.file) {
            formDataToSend.append('barberShopBackground', formData.file);
         }

         const updatedUser = {
            ...user,
            barbershops: {
               ...user.barbershops,
               name: formData.name,
               specialService: formData.specialService,
               homeService: formData.homeService,
            },
         };
         updateUser(updatedUser);

         Array.from(formDataToSend.entries()).forEach(([key, value]) => {
            console.log(`${key}:`, value);
         });

         if (user?.barbershops?.id) {
            await editInformationWithImage(user.barbershops.id, formDataToSend);
            toast.success("Informações atualizadas com sucesso!");
            setIsModalOpen(false);
         } else {
            console.error('ID da barbearia não encontrado.');
            toast.success("Estabelecimento não encontrado!");
         }
      } catch (error) {
         console.error('Erro ao salvar informações:', error);
         toast.success("Erro ao salvar informações!");
      }
   };


   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData((prev) => ({ ...prev, file }));
   };

   return (

      <div className="max-w-screen-md m-auto">
         <div className="w-full mt-5 h-[250px] relative">
            <div className="absolute z-10 top-3 left-4">
               <Button variant="secondary" className="px-3 py-5" onClick={() => router.back()}>
                  <ChevronLeft strokeWidth={2} size={24} />
               </Button>
            </div>
            {user.barbershops?.imageUrl ? (
               <Image
                  src={`${imagebarberShop.defaults.baseURL}${user.barbershops.imageUrl}`}
                  fill
                  alt={user.barbershops.name}
                  className='object-cover placeholder-opacity-75 rounded-t-lg'
               />
            ) : (
               <div className="h-[250px] w-full bg-stone-900 flex items-center justify-center">
                  <p>Sem imagem disponível</p>
               </div>
            )}
         </div>
         <div className="px-6 py-4">
            <h2 className="text-xl mb-2">{user.barbershops?.name}</h2>

            <div className="flex justify-between">
               <div className="sm:flex flex-col gap-2 hidden">
                  <div className="flex flex-row gap-2 items-center">
                     <MapPin size={18} className="text-primary" />
                     <p className="text-sm">{user.address ? `${user.address.street}, ${user.address.number} - ${user.address.neighborhood}` : 'Endereço não disponível'}

                     </p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                     <Star size={18} className="text-primary" />
                     <p className="text-sm"></p>
                  </div>
               </div>
               <div className="flex flex-col gap-2 relative">
                  <Button
                     variant="outline"
                     className="absolute right-0 top-[-45px]"
                     onClick={() => setIsModalOpen(true)}
                  >
                     <Edit size={18} className="text-primary-foreground" />
                  </Button>
                  {formData.specialService ? (
                     <div className="flex flex-row gap-2 items-center">
                        <Accessibility size={18} className="text-blue-400" />
                        <p className="text-sm">Atendimentos Especiais</p>
                     </div>
                  ) : (<div className="flex flex-row gap-2 items-center">
                     <Accessibility size={18} className="text-muted-foreground" />
                     <p className="text-sm text-muted-foreground">Editar Atendimentos Especiais</p>
                  </div>)}

                  {formData.homeService ? (
                     <div className="flex flex-row gap-2 items-center">
                        <House size={18} className="text-primary" />
                        <p className="text-sm">Atendimento á domicílio</p>
                     </div>) : (<div className="flex flex-row gap-2 items-center">
                        <House size={18} className="text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Editar Atendimento á domicílio</p>
                     </div>)}
               </div>
            </div>
         </div>
         <div className="border-b" />

         <div className="flex justify-start gap-2 my-4 mx-4">
            <Button
               variant={activeTab === 'services' ? 'default' : 'outline'}
               onClick={() => setActiveTab('services')}
            >
               Serviços
            </Button>
            <Button
               variant={activeTab === 'information' ? 'default' : 'outline'}
               onClick={() => setActiveTab('information')}
            >
               Informações
            </Button>
         </div>

         <div className="px-4 py-2">
            {activeTab === 'services' ? <Services /> : <Information />}
         </div>

         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-xl">
               <DialogTitle className="mb-3">Editar Informações da Barbearia</DialogTitle>

               <div className="mb-4">
                  <label htmlFor="fantasyName" className="block text-sm font-medium">Nome Fantasia</label>
                  <Input
                     type="text"
                     id="name"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="mt-1 p-2 border rounded-md w-full"
                     placeholder="Nome fantasia"
                  />
               </div>

               <div className="mb-4">
                  <label className="block text-sm font-medium">Serviços</label>
                  <div className="flex items-center gap-4 mt-2">
                     <div className="flex items-center">
                        <Checkbox
                           id="specialService"
                           checked={formData.specialService}
                           onCheckedChange={() => setFormData({ ...formData, specialService: !formData.specialService })}
                        />
                        <label htmlFor="specialService" className="ml-2 text-sm">Atendimento Especial</label>
                     </div>
                     <div className="flex items-center">
                        <Checkbox
                           id="homeService"
                           checked={formData.homeService}
                           onCheckedChange={() => setFormData({ ...formData, homeService: !formData.homeService })}
                        />
                        <label htmlFor="homeService" className="ml-2 text-sm">Atendimento a Domicílio</label>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium">Carregar Imagem</label>
                  <Input
                     type="file"
                     id="file"
                     onChange={handleFileChange}
                     className="mt-2 p-2 border rounded-md w-full"
                  />
               </div>

               <DialogFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSave}>Salvar</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default MyBarberShop;
