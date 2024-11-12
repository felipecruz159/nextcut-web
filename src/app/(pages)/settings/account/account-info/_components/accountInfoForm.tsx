"use client";
import { Button } from "@/app/_components/ui/button";
import { useUser } from "@/app/context/user";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InputMask from "react-input-mask";
import { axiosInstance } from "@/app/_helpers/axios-instance";
import { useRouter } from "next/navigation";


export const AccountInfoForm = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string | null>("");
  const [error, setError] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  
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
      setError("Por favor, preencha o nome.");
      return;
    }

    // * Phone is not a required field in the moment
    // if (!phone || phone.includes("_")) {
    //   setError("Por favor, preencha o telefone completo.");
    //   return;
    // }

    setError("");
    try {
      await axiosInstance.post(`/update-account-info`, { email, name, phone });

      toast.success("Dados alterados com sucesso!");
      // router.push('/');

    } catch (err) {
      console.error(err);
    }
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
        <InputMask
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          type="tel"
          mask="(99) 99999-9999"
          id="phone"
          name="phone"
          placeholder="Telefone"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Button className="w-full" type="submit">
          Atualizar dados
        </Button>
      </div>
    </form>
  );
};

export default AccountInfoForm;
