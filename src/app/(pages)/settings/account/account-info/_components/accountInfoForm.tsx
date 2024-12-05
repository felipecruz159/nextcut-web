'use client';
import { Button } from '@/app/_components/ui/button';
import { useUser } from '@/app/context/user';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import InputMask from 'react-input-mask';
import { axiosInstance } from '@/app/_helpers/axios-instance';

export const AccountInfoForm = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string | null>('');
  const [cep, setCep] = useState<string | null>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    setEmail(user.email);
    setName(user.name);
    setPhone(user.phone);
    setCep(user?.address?.zipCode || null);

    if (cep) {
      fetchAddress(cep);
      setNumber(user.address.number.toString());
    }
  }, [user]);

  const fetchAddress = async (cep: string) => {
    if (cep.replace(/\D/g, '').length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error('CEP inválido!');
        return;
      }

      setNeighborhood(data.bairro || '');
      setStreet(data.logradouro || '');
      setState(data.uf || '');
      setCity(data.localidade || '');
    } catch (err) {
      toast.error('Erro ao buscar endereço. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchAddress(cep ?? '');
  }, [cep]);

  const changeAccountData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setError('');

    const addressData = {
      zipCode: cep,
      street: street,
      neighborhood: neighborhood,
      number: number,
      city: city,
      state: state,
    };

    try {
      await axiosInstance.post(`/update-account-info`, {
        email,
        name,
        phone,
        addressData,
      });

      toast.success('Dados alterados com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar dados.');
    }
  };

  return (
    <form onSubmit={changeAccountData} className="mt-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="my-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
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
          required
        />
      </div>

      <div className="my-2">
        <Label htmlFor="phone">Telefone</Label>
        <InputMask
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          type="tel"
          mask="(99) 99999-9999"
          id="phone"
          name="phone"
          placeholder="Telefone"
          value={phone || ''}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="cep">CEP</Label>
        <InputMask
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          mask="99999-999"
          id="cep"
          name="cep"
          placeholder="CEP"
          value={cep ?? ''}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="street">Rua</Label>
        <Input
          type="text"
          id="street"
          name="street"
          placeholder="Rua"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="number">Número</Label>
        <Input
          type="text"
          id="number"
          name="number"
          placeholder="Número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="neighborhood">Bairro</Label>
        <Input
          type="text"
          id="neighborhood"
          name="neighborhood"
          placeholder="Bairro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="city">Cidade</Label>
        <Input
          type="text"
          id="city"
          name="city"
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Label htmlFor="state">Estado</Label>
        <Input
          type="text"
          id="state"
          name="state"
          placeholder="Estado"
          value={state}
          onChange={(e) => setState(e.target.value)}
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
