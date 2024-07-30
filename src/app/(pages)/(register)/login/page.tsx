import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/button";
import LoginForm from "./_components/login-form";
export default function Login() {
  return (
    <div className="h-screen flex justify-center flex-col">
      { /**
       * TODO: Add path to <Link> element 
       */ }
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

      <div className="container flex justify-center items-center">
        <div className="h-px w-full bg-border"></div>
        <p className="text-nowrap p-2 text-muted-foreground text-xs">
          ou entrar com
        </p>
        <div className="h-px w-full bg-border"></div>
      </div>

      <div className="flex container ">
        <Button className="w-full gap-3" variant={"outline"}>
          <Image
            src="/media-icons/google.svg"
            alt="Google"
            width={25}
            height={25}
          />
          Logar com o Google
        </Button>
      </div>

      <p className="text-center text-sm mt-6 font-light">
        Não tem conta?{" "}
        <Button variant="link" className="p-0">
          <Link href="/signup">Cadastre-se</Link>
        </Button>
      </p>
      { /**
       * TODO: Add language component
       */ }
    </div>

  );
}
