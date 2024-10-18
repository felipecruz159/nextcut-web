"use client";

import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const verifyEmail = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axiosInstance.post("/verifyemail", { token });

      toast.success("Email verificado sucesso!");

      router.push("/");
    } catch (error) {
      toast.error("Não foi possível verificar o email!");

      router.push("/");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return <></>;
};

export default verifyEmail;
