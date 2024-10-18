"use client";
import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import BackButton from "@/app/_components/ui/backButton";
import Image from "next/image";

interface EmailState {
  sent: boolean;
  canResend: boolean;
  timer: number;
}

export const ResetPasswordEmail = () => {
  const intervalTimer = 180;
  const maxAttempts: number = 3;

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [state, setState] = useState<EmailState>({
    sent: false,
    canResend: false,
    timer: intervalTimer,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(maxAttempts);
  const router = useRouter();

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timer <= 1) {
          clearInterval(intervalRef.current!);
          return { ...prev, timer: 0, canResend: true };
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (state.sent && state.timer > 0) startTimer();
    return () => clearInterval(intervalRef.current!);
  }, [state.sent, startTimer]);

  const handleSendEmail = async () => {
    if (!email) {
      setError("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      await axiosInstance.post("/reset-password-email", { email });
      toast.success("Email enviado com sucesso!");
      setState({ sent: true, canResend: false, timer: intervalTimer });
      setError("");
    } catch (error) {
      setError("Ocorreu um erro ao enviar o email!");
      console.error(error);
    }
  };

  const handleResendEmail = async () => {
    if (attemptsLeft > 0) {
      setAttemptsLeft((prev) => prev - 1);
      await handleSendEmail();
      startTimer();
    } else {
      setError("Número máximo de tentativas atingido!");
    }
  };

  const resetPasswordEmail = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await handleSendEmail();
  };

  return (
    <div className="container h-screen grid grid-cols-3 gap-4">
      <div className="hidden md:block md:col-span-2 place-content-center">
        <div className="max-w-2xl m-auto relative">
          <div className="w-2/4 h-4/5 bg-primary/20 absolute -z-10 rounded-full blur-3xl"></div>
          <Image
            src="/assets/viewLogin.svg"
            alt="Imagem Login"
            objectFit="contain"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="col-span-3 md:col-span-1 place-content-center">
        <div className="absolute top-6 left-6 ">
          <BackButton />
        </div>
        <div className="flex justify-center mt-4">
          <Image
            src="/logo.png"
            alt="Logo Nextcut"
            width={256}
            height={256}
            className="w-2/5 max-w-36"
          />
        </div>
        {!state.sent ? (
          <form onSubmit={resetPasswordEmail} className="mt-4 container">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="my-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-2">
              <Button className="w-full" type="submit">
                Enviar email
              </Button>
            </div>
          </form>
        ) : (
          <>
            {error === "" ? (
              <p className="text-center">
                Enviamos um email para{" "}
                <span className="text-primary">{email}</span>, <br /> verifique
                sua caixa de mensagem.
              </p>
            ) : (
              <p className="text-red-500 text-center">{error}</p>
            )}

            <p className="text-center text-sm my-6 font-light">
              Não recebeu o email?{" "}
              <Button
                onClick={handleResendEmail}
                disabled={!state.canResend}
                className={`bg-transparent ${
                  state.canResend ? "text-white" : "text-gray-400"
                } hover:bg-transparent hover:text-primary`}
              >
                {state.canResend ? "Reenviar" : `Aguarde ${state.timer}s`}
              </Button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
