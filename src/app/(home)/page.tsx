'use client'
const axios = require('axios');
import { useEffect, useState } from "react";
import { axiosInstance } from "../_helpers/axios-instance";
import HeaderSingin from "./_components/header-singin";
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Home() {
  const [barbershop, setBarbershop] = useState([])

  useEffect(() => {
    axiosInstance.get('barbershop').then((res) => {
      setBarbershop(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <HeaderSingin />

      <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-screen-xl mx-auto">
        <div className="mt-4 px-5">
          <h2 className="text-xl font-bold font-light">Olá, faça seu login</h2>
          <p className="capitalize text-muted-foreground text-sm">{format(new Date(), "EEEE',' d 'de' yyyy", {
            locale: ptBR
          })}</p>
          <p className=""></p>
          <div className="px-5 mt-6">
            {/* TODO: Make input seach */}
          </div>
        </div>

        {/* Card hidden below the "md" splint */}
        <div className="hidden md:flex">
          {/* TODO: Make card carousel */}
        </div>
      </div>

      <div>

      </div>
    </div>
  );
}
