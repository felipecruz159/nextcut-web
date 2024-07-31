"use client";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

// TODO: Remember to add condition to checkbox and make a validation for token expires

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // * Make it better
  /**
   * Function that returns a boolean type of checkbox
   * @param checked 'on || null'
   * @returns boolean
   */
  function setCheckbox(checked: any) {
    if (checked === 'on') {
      return true;
    }
    return false;
  }

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let checkbox = setCheckbox(formData.get("rememberMe"));

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      checkbox
    }

    signIn("credentials", {
      ...data,
      callbackUrl: "/home"
    })

  };

  return (
    <form onSubmit={login} className="mt-4">
      <div className="my-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="password">Senha</Label>
        <PasswordInput
          id="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="my-2 flex items-center gap-1 justify-between">
        <div className="flex items-center gap-1">
          <Checkbox name="rememberMe"></Checkbox>
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

      <div className="my-2">
        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
}
