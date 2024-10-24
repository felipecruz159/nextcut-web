import { Home, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SideMenuProps } from "../../types/client/sideMenu";

const HelpMenu: React.FC<SideMenuProps> = ({ onNavigate }) => (
  <>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none">
      <Link href="/help-center">
        <HelpCircle size={20} /> Centro de Ajuda
      </Link>
    </Button>
    <Button asChild variant="outline" className="w-full gap-2 justify-start border-none">
      <Link href="/faq">
        <HelpCircle size={20} /> FAQ
      </Link>
    </Button>
  </>
);

export default HelpMenu;
