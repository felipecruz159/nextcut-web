import {
  Settings,
  HelpCircle,
  Home,
  User2,
  CalendarClock,
  Heart,
  Store,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SideMenuProps } from "../types/client/sideMenu";

const MainMenu: React.FC<SideMenuProps> = ({ onNavigate }) => (
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
    <Button
      asChild
      variant="outline"
      className="w-full gap-2 justify-start border-none"
    >
      <Link href="/agenda">
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
        onClick={() => onNavigate("HELP")}
      >
        <Link href="#">
          <HelpCircle size={20} /> Ajuda
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="w-full gap-2 justify-start border-none"
        onClick={() => onNavigate("SETTINGS")}
      >
        <Link href="#">
          <Settings size={20} /> Configurações
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="w-full gap-2 justify-start border-none"
        // onClick={() => onNavigate("SETTINGS")}
      >
        <Link href="#">
          <Store size={20} /> Sugerir estabelecimentos
        </Link>
      </Button>
    </div>
  </>
);

export default MainMenu;
