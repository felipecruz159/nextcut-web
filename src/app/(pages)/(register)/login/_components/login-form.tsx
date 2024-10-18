'use client';
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Todos os campos devem ser preenchidos!')
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        toast.success('Bem vindo(a)');
        setError('');
        router.push('work-with-us')
      }
    }
  };

  return (
    <form onSubmit={login} className="mt-4">
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
            <Link href="/reset-password-email">Esqueceu a senha?</Link>
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
