import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/app/_components/ui/card";
import { searchServiceClient } from "@/app/api/professional/searchService";
import { ServiceFormData } from "@/app/types/generic";
import { PiScissors } from "react-icons/pi";
import { GiBeard, GiHandOk } from "react-icons/gi";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { BsStars } from "react-icons/bs";

const Services = ({ barberShopId }: { barberShopId: string }) => {
   const [services, setServices] = useState<ServiceFormData[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const fetchServices = async () => {
      if (!barberShopId) return;
      setIsLoading(true);
      const servicesData = await searchServiceClient(barberShopId);
      setServices(servicesData);
      setIsLoading(false);
   };

   console.log(services)

   useEffect(() => {
      fetchServices();
   }, [barberShopId]);

   const getIcon = (icon: string) => {
      switch (icon) {
         case "cabelo":
            return <PiScissors className="w-5 h-5 opacity-70" />;
         case "barba":
            return <GiBeard className="w-5 h-5 opacity-70" />;
         case "rosto":
            return <MdOutlineFaceRetouchingNatural className="w-5 h-5 opacity-70" />;
         case "estetica":
            return <MdOutlineFaceRetouchingNatural className="w-5 h-5 opacity-70" />;
         case "unhas":
            return <GiHandOk className="w-5 h-5 opacity-70" />;
         case "eventos":
            return <BsStars className="w-5 h-5 opacity-70" />;
         default:
            return null;
      }
   };

   const truncateDescription = (description: string, maxLength: number) => {
      if (description.length > maxLength) {
         return description.slice(0, maxLength) + '...';
      }
      return description;
   };

   return (
      <div>
         <div className="mb-4"></div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
               <p>Carregando serviços...</p>
            ) : services.length > 0 ? (
               services.map((service) => (
                  <div key={service.name} className="w-full max-w-sm mb-4">
                     <Card className="h-full flex flex-col">
                        <CardHeader className="p-4">
                           <div className="flex items-center justify-between">
                              <Badge variant="secondary">{service.category}</Badge>
                              {service.category && getIcon(service.category)}
                           </div>
                           <CardTitle className="text-xl">{service.name}</CardTitle>
                           <CardDescription className="text-sm">{truncateDescription(service.description, 70)}</CardDescription>
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
               <p className="text-muted-foreground">Atualmente, não há serviços cadastrados nesse estabelecimento!</p>
            )}
         </div>
      </div>
   );
};

export default Services;
