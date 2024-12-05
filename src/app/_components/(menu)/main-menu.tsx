import {
  Settings,
  HelpCircle,
  Home,
  CalendarClock,
  Heart,
  Store,
  Building,
  User2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SideMenuProps } from '../../types/client/sideMenu';
import { useUser } from '@/app/context//user';

const MainMenu: React.FC<SideMenuProps> = ({ onNavigate }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Button
        asChild
        variant="outline"
        className="w-full gap-2 justify-start border-none"
      >
        <Link href="/">
          <Home size={20} /> Início
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="w-full gap-2 justify-start border-none"
      >
        <Link href="/profile">
          <User2 size={20} /> Perfil
        </Link>
      </Button>

      {user?.type === 'professional' && (
        <Button
          asChild
          variant="outline"
          className="w-full gap-2 justify-start border-none"
        >
          <Link href="/my-barbershop">
            <Building size={20} /> Minha Loja
          </Link>
        </Button>
      )}

      <Button
        asChild
        variant="outline"
        className="w-full gap-2 justify-start border-none"
      >
        <Link href="/agenda" className="pointer-events-none">
          <CalendarClock size={20} /> Agenda
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="w-full gap-2 justify-start border-none"
      >
        <Link href="/favorites">
          <Heart size={20} /> Favoritos
        </Link>
      </Button>

      <Separator />
      <div className="text-muted-foreground">
        <Button
          asChild
          variant="outline"
          className="w-full gap-2 justify-start border-none"
          onClick={() => onNavigate('HELP')}
        >
          <Link href="#">
            <HelpCircle size={20} /> Ajuda
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full gap-2 justify-start border-none"
          onClick={() => onNavigate('SETTINGS')}
        >
          <Link href="#">
            <Settings size={20} /> Configurações
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full gap-2 justify-start border-none"
        >
          <Link href="/work-with-us">
            <Store size={20} /> Sugerir estabelecimentos
          </Link>
        </Button>
      </div>
    </>
  );
};

export default MainMenu;
