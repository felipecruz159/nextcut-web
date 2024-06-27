"use client";
import Image from "next/image";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { useState } from "react";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
export default function Login() {
  const [password, setPassword] = useState<string>("");
  return (
    <>
    { /**
       * TODO: Add path to <Link> element 
       * TODO: Authenticate to Next Auth
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
      <form method="" className="container mt-4">
        <div className="my-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="my-2">
          <Label htmlFor="password">Senha</Label>
          <PasswordInput
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-2 flex items-center gap-1 justify-between">
          <div className="flex items-center gap-1">
            <Checkbox id="rememberMe" />
            <label
              htmlFor="rememberMe"
              className="text-xs leading-none font-light"
            >
              Lembrar de mim
            </label>
          </div>
          <div>
            <Button variant="link" className="text-xs font-light p-0">
              <Link href="recover-password">Esqueceu a senha?</Link>
            </Button>
          </div>
        </div>

        <div className="my-2 ">
          <Button asChild className="w-full">
            <Link href="">Entrar</Link>
          </Button>
        </div>
      </form>

      <div className="container flex justify-center items-center">
        <div className="h-px w-full bg-border"></div>
        <p className="text-nowrap p-2 text-muted-foreground text-xs">
          ou entrar com
        </p>
        <div className="h-px w-full bg-border"></div>
      </div>

      <div className="flex justify-around">
        <div className="facebook">
          <Image
            src="/media-icons/facebook.svg"
            alt="Facebook"
            width={48}
            height={48}
          />
        </div>
        <div>
          <Image
            src="/media-icons/google.svg"
            alt="Google"
            width={48}
            height={48}
          />
        </div>
      </div>

      <p className="text-center text-sm mt-6 font-light">
        Não tem conta?{" "}
        <Button variant="link" className="p-0">
          <Link href="">Cadastre-se</Link>
        </Button>
      </p>
      { /**
       * TODO: Add language component
       */ }
    </>
  );
}
