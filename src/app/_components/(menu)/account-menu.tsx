import { KeyRound, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SideMenuProps } from "../../types/client/sideMenu";

const AccountMenu: React.FC<SideMenuProps> = ({ onNavigate }) => (
  <>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none">
      <Link href="settings/account/account-info">
        <User2 size={20} /> Informações pessoais
      </Link>
    </Button>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none">
      <Link href="settings/account/access-info">
        <KeyRound size={20} /> Informações de acesso
      </Link>
    </Button>
  </>
);

export default AccountMenu;
