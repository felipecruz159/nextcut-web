import Image from "next/image";
import Link from "next/link";

import LoginForm from "./_components/login-form";
import { Separator } from "@/app/_components/ui/separator"
import BackButton from "@/app/_components/ui/backButton";
import ButtonGoogle from "@/app/_components/buttonGoogle";

export default function Login() {
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
            height={1000} />
        </div>
      </div>

      <div className="col-span-3 md:col-span-1 place-content-center" >
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

        <LoginForm />

        <div className="flex items-center justify-center w-full my-4">
          <Separator className="flex-1" />
          <span className="px-2 text-xs text-muted-foreground whitespace-nowrap">ou entrar com</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex">
          <ButtonGoogle />
        </div>

        <p className="text-center text-sm my-6 font-light">
          Não tem conta? <span className="hover:underline underline-offset-4 text-primary"><Link href="/signup">Cadastre-se</Link></span>
        </p>
      </div>
    </div>
  );
}
