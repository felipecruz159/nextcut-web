'use client'
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BarberDetailsPageProp {
   params?: {
      id: string;
   }
}

interface Barber {
   id: string;
   name: string;
   address: string;
   imageUrl: string;
}

const BarberDetails = ({ params }: BarberDetailsPageProp) => {
   const router = useRouter();
   const [barber, setBarber] = useState<Barber | undefined>();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState<string | undefined>();

   useEffect(() => {
      if (params?.id) {
         setLoading(true);
         axiosInstance.get(`barberDetails/${params.id}`)
            .then((res) => {
               setBarber(res.data);
               setLoading(false);
            })
            .catch((err) => {
               console.error("Error fetching barber details:", err);
               setError("Failed to fetch barber details. Please try again later.");
               setLoading(false);
            });
      }
   }, [params?.id]); // Dependency on params.id ensures useEffect runs when id changes

   if (isLoading) {
      // TODO: create page for loading
      return <p>Loading...</p>;
   }

   if (error) {
      // TODO: create page for error
      return <p>{error}</p>;
   }

   return (
      <>
         {barber && (
            <>
               <h1>{barber.name}</h1>
               <p>{barber.address}</p>
               <p>{barber.id}</p>
            </>
         )}
      </>
   );
}

export default BarberDetails;