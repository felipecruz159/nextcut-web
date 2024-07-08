"use client";
import Image from "next/image";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { useState } from "react";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
import SignupForm from "./_components/signup-form";
export default function SignUp() {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  return (

    <div className="h-screen flex flex-col justify-center">
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
      
      <SignupForm />

      <p className="text-center text-sm mt-6 font-light">
        Já tem uma conta?{" "}
        <Button variant="link" className="p-0">
          <Link href="">Entre agora</Link>
        </Button>
      </p>
      {/**
       * TODO: Add language component
       */}
    </div>

  );
}
