'use client'
import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/app/_components/ui/dialog';
import { Input } from '@/app/_components/ui/input';
import { Textarea } from '@/app/_components/ui/textarea';
import { editInformation } from '@/app/api/professional/searchService';
import { useUser } from '@/app/context/user';
import axios from 'axios';
import { Clock, Edit, MapPin, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

const Information = () => {
   const { user, updateUser } = useUser();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentStep, setCurrentStep] = useState(1);
   const router = useRouter();

   return (
      <div>
         <div>
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
                  <MapPin size={18} /> {user?.address ? `${user.address.street} - ${user.address.number}, ${user.address.neighborhood} - ${user.address.city}` : 'Localização não disponível'}
               </p>
            </div>
         </div>


      </div>
   );
};

export default Information;
