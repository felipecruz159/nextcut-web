import Image from "next/image";
import Link from "next/link";
import SignupForm from "./_components/signup-form";
import BackButton from "@/app/_components/ui/backButton";

export default function SignUp() {
  return (
    <div className="container h-screen grid grid-cols-3 gap-4">
      <div className="col-span-3 md:col-span-1 place-content-center" >
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

        <SignupForm />

        <p className="text-center text-sm my-6 font-light">
          Já tem uma conta? <span className="hover:underline underline-offset-4 text-primary"><Link href="/login">Entrar</Link></span>
        </p>
      </div>

      <div className="hidden md:block md:col-span-2 place-content-center">
        <div className="max-w-2xl m-auto relative">
          <div className="w-3/5 h-4/5 bg-primary/20 absolute -z-10 rounded-full blur-3xl"></div>
          <Image
            src="/assets/viewLogin.svg"
            alt="Imagem Login"
            objectFit="contain"
            width={1000}
            height={1000} />
        </div>
      </div>
    </div>
  );
}
