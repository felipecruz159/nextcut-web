import { User2, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { SideMenuProps } from "../types/client/sideMenu";

const SettingsMenu: React.FC<SideMenuProps> = ({ onNavigate }) => (
  <>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none">
      <Link href="/account">
        <User2 size={20} /> Conta
      </Link>
    </Button>
    <Button
      className="w-full bg-transparent hover:bg-transparent gap-2 justify-start px-4"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOutIcon size={20}/> Sair da conta
    </Button>
  </>
);

export default SettingsMenu;
