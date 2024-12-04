'use client';

import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useState, useEffect } from "react";
import BarberItem from "./barber-item";
import { Ibarber } from "@/app/types/generic";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetchBarbershops } from "@/app/api/professional/barberShops";

const Cards = () => {
  const [error, setError] = useState<string | null>(null);

  const fetchBarbershopsBySearchQuery = async (url: string) => {
    const res = await axiosInstance.get(url);
    return res.data;
  };

  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR<Ibarber[]>(
    searchQuery
      ? `/search/${encodedSearchQuery}`
      : `/barbershop/`,
    searchQuery ? fetchBarbershopsBySearchQuery : fetchBarbershops
  );

  return (
    <div>


      <div className="pl-5 mt-6 md:container mb-10">
        <h2 className="uppercase text-base text-muted-foreground mb-3">
          Ofertas Exclusivas
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data && data.length > 0 ? (
          <div className="flex flex-row gap-3 md:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {data.map((item) => (
              <BarberItem key={item.id} barber={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum estabelecimento encontrado!</p>
        )}

      </div>
      <div className="pl-5 mt-6 m-auto md:container mb-10">
        <h2 className="uppercase text-base text-muted-foreground mb-3">
          TODOS
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data && data.length > 0 ? (
          <div className="flex flex-row m-auto flex-wrap gap-3 md:gap-5 ">
            {data.map((item) => (
              <BarberItem key={item.id} barber={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum estabelecimento encontrado!</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
