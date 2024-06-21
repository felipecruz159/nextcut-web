'use client'
const axios = require('axios');
import { useEffect, useState } from "react";
import { axiosInstance } from "../_helpers/axios-instance";

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
    <main className="">

    </main>
  );
}
