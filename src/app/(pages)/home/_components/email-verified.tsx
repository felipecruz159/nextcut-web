"use client";
import { Button } from "@/app/_components/ui/button";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useUser } from "@/app/context/user";
import { Mail } from "lucide-react";
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

  return (
    <>
      {isVisible && (
        <div className="bg-primary flex justify-evenly w-full h-6 items-center">
          <div className="flex gap-2">
            <Mail />
            <p>Por favor verifique o seu email clicando no botão ao lado!</p>
          </div>
          <Button
            className="m-1 text-white underline"
            variant={'link'}
            onClick={handleVerifyEmail}
            disabled={disabled}
          >
            Verificar email
          </Button>
        </div>
      )}
    </>
  );
};

export default VerifiedEmail;
