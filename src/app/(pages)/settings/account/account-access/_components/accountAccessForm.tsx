"use client";
import { Button } from "@/app/_components/ui/button";
import { useUser } from "@/app/context/user";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AccountAccessForm = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string | null>("");
  const [error, setError] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    // console.log(user);
    setEmail(user.email);
    setName(user.name);
    setPhone(user.phone);
  }, [user]);

  const changeAccountData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setError("Nome deve estar preenchido!");
    }

    toast.success("Dados alterados com sucesso!");
  };

  return (
    <form onSubmit={changeAccountData} className="mt-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="my-2">
        <Label htmlFor="name">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </div>

      <div className="my-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="name">Telefone</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Telefone"
          value={phone || ''}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
};

export default AccountAccessForm;
