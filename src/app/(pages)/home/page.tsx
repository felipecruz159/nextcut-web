'use client'
const axios = require('axios');
import { useEffect, useState } from "react";
import { axiosInstance } from "../../_helpers/axios-instance";
import HeaderSingin from "./_components/header-singin";
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Search from "./_components/search";
import Categories from "./_components/categories";
import BarberItem from './_components/barber-item';

export default function Home() {
  const [barbershop, setBarbershop] = useState([])

  useEffect(() => {
    axiosInstance.get('barbershop/').then((res) => {
      setBarbershop(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <HeaderSingin />

      <div className="grid grid-cols-1 md:grid-cols-2 md:container mx-5">
        <div className="mt-4 ">
          <h2 className="text-xl font-light">Olá, faça seu login</h2>
          <p className="capitalize text-muted-foreground text-sm">{format(new Date(), "EEEE',' d 'de' MMMM", {
            locale: ptBR
          })}</p>
          <p className=""></p>
          <div className=" mt-6">
            <Search />
          </div>
        </div>

        {/* Card hidden below the "md" splint */}
        <div className="hidden md:flex">
          {/* TODO: Make card carousel */}
        </div>
      </div>

      <div className="mt-6 px-5 md:container">
        <h2 className="uppercase text-base text-muted-foreground mb-3">Categorias</h2>
        <div className="flex flex-row gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
          <Categories />
        </div>
      </div>

      <div className="pl-5 mt-6 md:container">
        <h2 className="uppercase text-base text-muted-foreground mb-3">Ofertas Exclusivas</h2>
        <div className="flex flex-row gap-3 md:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((item: any) => (
            <BarberItem key={item.id} barber={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
