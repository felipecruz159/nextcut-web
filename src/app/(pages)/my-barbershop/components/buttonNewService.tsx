"use client";

import React, { useState } from 'react';
import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter
} from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/app/_components/ui/textarea';

const ButtonNewService = () => {
   const [open, setOpen] = useState(false);
   const { register, handleSubmit, setValue, formState: { errors } } = useForm();

   const onSubmit = (data: any) => {
      console.log(data);
      setOpen(false);
   };

   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button variant="outline">Adicionar Novo Serviço</Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Adicionar Serviço</DialogTitle>
                  <DialogDescription>
                     Preencha as informações do serviço abaixo.
                  </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-4'>
                     <label htmlFor="name">Nome</label>
                     <Input id="name" {...register('name', { required: 'Nome é obrigatório' })} />
                     {errors.name && <span className="text-red-500">{(errors.name as any).message}</span>}
                  </div>
                  <div className='mb-4'>
                     <label htmlFor="description">Descrição</label>
                     <Textarea id="description" {...register('description', { required: 'Descrição é obrigatória' })} />
                     {errors.description && <span className="text-red-500">{(errors.description as any).message}</span>}
                  </div>
                  <div className='mb-4'>
                     <label htmlFor="price">Preço</label>
                     <Input
                        id="price"
                        type="text"
                        {...register('price', {
                           required: 'Preço é obrigatório',
                           pattern: {
                              value: /^\d+([.,]?\d{0,2})?$/,
                              message: 'Digite um preço válido',
                           },
                        })}
                     />
                     {errors.price && <span className="text-red-500">{(errors.price as any).message}</span>}
                  </div>
                  <div className='mb-4'>
                     <label htmlFor="category">Categoria</label>
                     <Select onValueChange={(value) => setValue('category', value)} required>
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
                     {errors.category && <span className="text-red-500">Categoria é obrigatória</span>}
                  </div>
                  <div className='mb-4'>
                     <label htmlFor="time">Tempo (minutos)</label>
                     <Input id="time" type="number" {...register('time', { required: 'Tempo é obrigatório', min: { value: 1, message: 'O tempo deve ser pelo menos 1 minuto' } })} />
                     {errors.time && <span className="text-red-500">{(errors.time as any).message}</span>}
                  </div>
                  <DialogFooter>
                     <Button type="button" variant={"outline"} onClick={() => setOpen(false)}>Cancelar</Button>
                     <Button type="submit">Salvar</Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ButtonNewService;