'use client'

import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useState, useEffect } from "react";
import BarberItem from "./barber-item";

const Cards = () => {
    const [barbershop, setBarbershop] = useState([])

    useEffect(() => {
      axiosInstance.get('barbershop/').then((res) => {
        setBarbershop(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }, [])
  

  return (
    <div className="pl-5 mt-6 md:container">
      <h2 className="uppercase text-base text-muted-foreground mb-3">
        Ofertas Exclusivas
      </h2>
      <div className="flex flex-row gap-3 md:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {barbershop.map((item: any) => (
          <BarberItem key={item.id} barber={item} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
