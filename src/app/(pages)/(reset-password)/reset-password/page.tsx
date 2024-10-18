"use client";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import BackButton from "@/app/_components/ui/backButton";
import Image from "next/image";

export const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams(); // Captura dos parâmetros da URL
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken); // Armazena o token se presente
    } else {
      setError("Token não encontrado na URL!");
    }
  }, [searchParams]);


  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError("Todos os campos devem ser preenchidos!");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais!");
      return;
    }

    try {
      const result = await axiosInstance.post("/reset-password", {
        token,
        newPassword: password,
      });

      if (result.status === 200) {
        toast.success("Senha redefinida com sucesso!");
        setError("");
        router.push("/login");
      } else {
        setError("Ocorreu um erro ao redefinir a senha!");
      }
    } catch (error) {
      setError("Erro na comunicação com o servidor!");
    }
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
        <div className="absolute top-6 left-6">
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

        <form onSubmit={resetPassword} className="mt-4 container">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="my-2">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
              id="password"
              name="password"
              value={password}
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Limpar erro ao alterar o campo
              }}
            />
          </div>

          <div className="my-2">
            <Label htmlFor="confirm-password">Confirme a senha</Label>
            <PasswordInput
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              placeholder="Confirme a senha"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(""); // Limpar erro ao alterar o campo
              }}
            />
          </div>

          <div className="my-2">
            <Button className="w-full" type="submit">
              Redefinir
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
