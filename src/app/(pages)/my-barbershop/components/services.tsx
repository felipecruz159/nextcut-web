import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { Clock, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { useUser } from "@/app/context/user";
import { searchService, deleteService } from "@/app/api/professional/searchService";
import { ServiceFormData } from "@/app/types/generic";
import { toast } from "sonner";
import { updateService } from "@/app/api/professional/register/registerService";
import ButtonNewService from "./buttonNewService";

const Services = () => {
   const { user } = useUser();
   const [services, setServices] = useState<ServiceFormData[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [currentService, setCurrentService] = useState<ServiceFormData | null>(null);

   const fetchServices = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      const servicesData = await searchService(user.id);
      setServices(servicesData);
      setIsLoading(false);
   };

   const handleEdit = (service: ServiceFormData) => {
      setCurrentService(service);
      setIsEditModalOpen(true);
   };

   const handleDelete = (service: ServiceFormData) => {
      setCurrentService(service);
      setIsDeleteModalOpen(true);
   };

   const confirmDelete = async () => {
      if (currentService) {
         await deleteService(currentService.id);
         fetchServices();
         setIsDeleteModalOpen(false);
         toast.success("Serviço excluído com sucesso!");
      }
   };

   const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); // Previne o comportamento padrão de submit
      if (currentService && currentService.id) {
         // Verifique se o id existe antes de chamar a API
         await updateService(currentService);
         fetchServices();
         setIsEditModalOpen(false);
         toast.success("Serviço atualizado com sucesso!");
      } else {
         toast.error("ID do serviço não encontrado.");
      }
   };


   useEffect(() => {
      fetchServices();
   }, [user?.id]);

   const truncateDescription = (description: string, maxLength: number) => {
      return description.length > maxLength
         ? description.slice(0, maxLength) + "..."
         : description;
   };

   return (
      <div className="mb-24">
         <div className="mb-4">
            <ButtonNewService onServiceAdded={() => fetchServices()} />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
               <p>Carregando serviços...</p>
            ) : services.length > 0 ? (
               services.map((service) => (
                  <div key={service.id} className="w-full max-w-sm mb-4">
                     <Card className="h-full flex flex-col relative">
                        <CardHeader className="p-4">
                           <div className="flex items-center justify-between">
                              <Badge variant="secondary">{service.category}</Badge>
                              <div className="absolute top-2 right-2 flex gap-2">
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-blue-500"
                                    onClick={() => handleEdit(service)}
                                 >
                                    <Edit size={18} />
                                 </Button>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:text-red-500"
                                    onClick={() => handleDelete(service)}
                                 >
                                    <Trash2 size={18} />
                                 </Button>
                              </div>
                           </div>
                           <CardTitle className="text-xl">{service.name}</CardTitle>
                           <CardDescription className="text-sm">
                              {truncateDescription(service.description, 70)}
                           </CardDescription>
                        </CardHeader>
                        <CardContent className="px-4 py-0 flex-grow">
                           <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                 <Clock className="mr-2 h-4 w-4 opacity-70" />
                                 <span>{service.time} min</span>
                              </div>
                              <span className="text-2xl font-bold">R$ {service.price}</span>
                           </div>
                        </CardContent>
                        <CardFooter className="p-4">
                           <Button className="w-full">Agendar</Button>
                        </CardFooter>
                     </Card>
                  </div>
               ))
            ) : (
               <p>Nenhum serviço, clique em adicionar.</p>
            )}
         </div>

         {currentService && (
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Editar Serviço</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit}>
                     <div className="mb-4">
                        <label htmlFor="name">Nome</label>
                        <Input
                           id="name"
                           value={currentService.name}
                           onChange={(e) =>
                              setCurrentService((prev) => ({
                                 ...prev!,
                                 name: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="description">Descrição</label>
                        <Textarea
                           id="description"
                           value={currentService.description}
                           onChange={(e) =>
                              setCurrentService((prev) => ({
                                 ...prev!,
                                 description: e.target.value,
                              }))
                           }
                        />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="price">Preço</label>
                        <Input
                           id="price"
                           value={currentService.price.toString()}
                           onChange={(e) =>
                              setCurrentService((prev) => ({
                                 ...prev!,
                                 price: parseFloat(e.target.value),
                              }))
                           }
                        />
                     </div>

                     <div className="mb-4">
                        <label htmlFor="category">Categoria</label>
                        <Select
                           value={currentService.category}
                           onValueChange={(value) =>
                              setCurrentService((prev) => ({
                                 ...prev!,
                                 category: value,
                              }))
                           }
                        >
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione uma categoria" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="cabelo">Cabelo</SelectItem>
                              <SelectItem value="barba">Barba</SelectItem>
                              <SelectItem value="rosto">Beleza</SelectItem>
                              <SelectItem value="estetica">Estética</SelectItem>
                              <SelectItem value="unhas">Unhas</SelectItem>
                              <SelectItem value="eventos">Eventos</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="mb-4">
                        <label htmlFor="time">Tempo (minutos)</label>
                        <Input
                           id="time"
                           type="number"
                           value={currentService.time.toString()}
                           onChange={(e) =>
                              setCurrentService((prev) => ({
                                 ...prev!,
                                 time: parseInt(e.target.value),
                              }))
                           }
                        />
                     </div>

                     <DialogFooter>
                        <Button
                           type="button"
                           variant={"outline"}
                           onClick={() => setIsEditModalOpen(false)}
                        >
                           Cancelar
                        </Button>
                        <Button type="submit">Salvar</Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         )}

         {currentService && (
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Excluir Serviço</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                     Deseja realmente excluir o serviço "{currentService.name}"?
                  </DialogDescription>
                  <DialogFooter>
                     <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => setIsDeleteModalOpen(false)}
                     >
                        Cancelar
                     </Button>
                     <Button
                        type="button"
                        onClick={confirmDelete}
                        variant={"destructive"}
                     >
                        Excluir
                     </Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         )}
      </div>
   );
};

export default Services;
