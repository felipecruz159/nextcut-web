"use client"
import Image from "next/image";
import Link from "next/link";
import SignupForm from "./_components/signup-form";
import AlternativeHeader from "@/app/_components/alternativeHeader";

export default function SignUp() {

  return (
    <div className="container h-screen grid grid-cols-3 gap-4">
      <div className="col-span-3 md:col-span-1 place-content-center" >
        <AlternativeHeader variant={'logo'} />

        <SignupForm />

        <p className="text-center text-sm my-6 font-light">
          Já tem uma conta? <span className="hover:underline underline-offset-4 text-primary"><Link href="/login">Entrar</Link></span>
        </p>
      </div>

      <div className="hidden md:block md:col-span-2 place-content-center">
        <div className="max-w-2xl m-auto relative">
          <div className="w-3/5 h-4/5 bg-primary/20 absolute -z-10 rounded-full blur-3xl"></div>
          <Image
            src="/assets/viewSignUp.svg"
            alt="Imagem Login"
            objectFit="contain"
            width={1000}
            height={1000} />
        </div>
      </div>
    </div>
  );
}
