import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
import { useForm, Controller } from "react-hook-form";

export default function LoginForm() {
  interface dataProp {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  const { register, handleSubmit, control } = useForm<dataProp>();

  const handleSubmitData = (data: dataProp) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="container mt-4">
      <div className="my-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
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

      <div className="my-2 flex items-center gap-1 justify-between">
        <div className="flex items-center gap-1">
          <Checkbox {...register("rememberMe")}></Checkbox>
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
