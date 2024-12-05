"use client";
import { Button } from "@/app/_components/ui/button";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useUser } from "@/app/context/user";
import { Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifiedEmail = () => {
  const { user } = useUser();

  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (user && user?.emailVerified === null) {
      setIsVisible(true);
    }
  }, [user]);

  const handleVerifyEmail = async () => {
    try {
      const response = await axiosInstance.post("/verify-logged-email", {
        email: user?.email,
        userId: user?.id,
      });

      setIsDisabled(true);
      if (response.status === 200) {
        toast.success("Email enviado com sucesso!");
        setIsVisible(false);
      } else {
        setIsDisabled(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao verificar seu email. Por favor, tente novamente."
      );
      setIsDisabled(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="bg-primary flex justify-evenly items-center w-full h-auto p-2">
          <div className="flex gap-2 items-center">
            <Mail />
            <p className="text-white text-sm">Verifique o seu email aqui!</p>
          </div>
          <div className="flex items-center">
            <Button
              className="m-1 text-white underline"
              variant="link"
              onClick={handleVerifyEmail}
              disabled={disabled}
            >
              Verificar email
            </Button>
            <Button
              className="text-white p-0 ml-2 h-fit bg-black"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifiedEmail;
