import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { PasswordInput } from "@ui/password-input";
import { Checkbox } from "@ui/checkbox";
import Link from "next/link";
import { Button } from "@ui/button";
import { useState } from "react";
import { registerUserApi } from "@/app/api/client/register/registerUserApi";
import { SignupFormData } from "@/app/types/client/typesClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function SignupForm() {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { register, handleSubmit, control, reset } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false
    }
  });

  const handleSubmitData: SubmitHandler<SignupFormData> = async (data) => {
    const { name, email, password, passwordConfirmation, terms } = data;

    if (!name || !email || !password || !passwordConfirmation) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (!terms) {
      setError('Necessário concordar com os Termos de serviço e Política de Privacidade');
      return;
    }

    if (password.length < 4) {
      setError('A senha deve conter pelo menos 4 dígitos');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('As senhas não correspondem');
      return;
    }

    setError('');

    try {
      await registerUserApi(name, email, password);
      toast.success('Usuário cadastrado com sucesso!');
      reset({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        terms: false
      });
      router.push('/login');
    } catch (error) {
      setError('Erro ao cadastrar usuário!');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="container mt-4">
      {error && <div className="my-4 text-center text-red-500">{error}</div>}
      <div className="my-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          placeholder="Nome"
          {...register("name")}
        />
      </div>

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

      <div className="my-2">
        <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field }) => (
            <PasswordInput {...field} placeholder="Confirmar senha" />
          )}
        />
      </div>

      <div className="flex items-center gap-1 my-4">
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
              }}
            />
          )}
        />
        <p className="text-xs leading-none font-light">
          Eu concordo com os <Link href="" className="p-0 text-xs text-primary cursor-pointer">Termos de serviço</Link> e <Link href="" className="p-0 text-xs text-primary cursor-pointer">Política de Privacidade</Link>
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
