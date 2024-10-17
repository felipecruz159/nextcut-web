'use client';

import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useState, useEffect } from "react";
import BarberItem from "./barber-item";
import { Ibarber } from "@/app/types/generic";

const Cards = () => {
  const [barbershop, setBarbershop] = useState<Ibarber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const res = await axiosInstance.get('/barbershop/');
        setBarbershop(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch barbershops");
      } finally {
        setLoading(false);
      }
    };

    fetchBarbershops();
  }, []);

  return (
    <div className="pl-5 mt-6 md:container">
      <h2 className="uppercase text-base text-muted-foreground mb-3">
        Ofertas Exclusivas
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-row gap-3 md:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((item: Ibarber) => (
            <BarberItem key={item.id} barber={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
