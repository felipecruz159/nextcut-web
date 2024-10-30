import { KeyRound, Crown } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SideMenuProps } from "../../types/client/sideMenu";

const AccountMenu: React.FC<SideMenuProps> = ({ onNavigate }) => (
  <>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none">
      <Link href="/settings/account/account-access">
        <KeyRound size={20} /> Informações de acesso
      </Link>
    </Button>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none text-primary">
      <Link href="#">
        <Crown size={20} /> Tornar-se Premium
      </Link>
    </Button>
  </>
);

export default AccountMenu;
