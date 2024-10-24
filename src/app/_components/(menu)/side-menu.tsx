"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MainMenu from "./main-menu";
import SettingsMenu from "./settings-menu";
import HelpMenu from "./help-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AccountMenu from "./account-menu";

const SideMenu = () => {
  const { data: session } = useSession();
  const [activeMenu, setActiveMenu] = useState("MAIN");

  const getInitials = (fullName: string) => {
    const parts = fullName.split(" ");
    return parts.length === 1
      ? parts[0].slice(0, 2)
      : parts[0][0] + parts[parts.length - 1][0];
  };

  const renderActiveMenu = () => {
    switch (activeMenu) {
      case "SETTINGS":
        return <SettingsMenu onNavigate={setActiveMenu} />;
      case "HELP":
        return <HelpMenu onNavigate={setActiveMenu} />;
      case "ACCOUNT":
        return <AccountMenu onNavigate={setActiveMenu} />
      default:
        return <MainMenu onNavigate={setActiveMenu} />;
    }
  };

  const handleBack = () => {
    setActiveMenu("MAIN");
  };

  return (
    <div>
      <SheetHeader className="border-b mb-4 p-4">
        <SheetTitle className="flex flex-row items-center">
          {activeMenu !== "MAIN" && (
            <Button
              asChild
              variant="outline"
              className="border-none hover:bg-transparent p-0 m-0 mr-2"
              onClick={handleBack}
            >
              <Link href="#">
                <ArrowLeft size={20} />
              </Link>
            </Button>
          )}
          {activeMenu === "SETTINGS"
            ? "Configurações"
            : activeMenu === "HELP"
            ? "Ajuda"
            : activeMenu === "ACCOUNT"
            ? "Conta"
            : "Menu"}
        </SheetTitle>
      </SheetHeader>

      {session?.user && (
        <Link href="/profile">
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={session.user.image || ""} alt="User Image" />
                <AvatarFallback>
                  {getInitials(session.user.name || "AV")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md">{session.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-2 items-center">
        {renderActiveMenu()}
      </div>
    </div>
  );
};

export default SideMenu;
