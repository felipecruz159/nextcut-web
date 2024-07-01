import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// Definindo tipos para os dados do formulário
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}

export default function SignupForm() {
  const { register, handleSubmit, control } = useForm<SignupFormData>();

  const handleSubmitData: SubmitHandler<SignupFormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="container mt-4">
      <div className="my-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          placeholder="Nome"
          {...register("name", { required: true })}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="password">Senha</Label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordInput {...field} placeholder="Senha" />
          )}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="passwordConfirmation">Confirmar senha </Label>
        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field }) => (
            <PasswordInput {...field} placeholder="Confirmar senha" />
          )}
        />
      </div>

      <div className="flex items-center gap-1 my-2">
        <Checkbox id="terms-and-conditions" />

        <p className="text-xs leading-none font-light">
          Eu concordo com os{" "}
          <Link href="" className="p-0 text-xs text-primary cursor-pointer">
            Termos de serviço
          </Link>{" "}
          e{" "}
          <Link href="" className="p-0 text-xs text-primary cursor-pointer">
            Política de Privacidade
          </Link>
        </p>
      </div>

      <div className="my-2">
        <Button className="w-full" type="submit">
          Cadastrar
        </Button>
      </div>

      
    </form>
  );
}
