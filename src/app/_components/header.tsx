import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@ui/card";
import { Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./(menu)/side-menu";
import Image from "next/image";

export default async function Header() {
  const session = await getServerSession();

  return (
    <Card className="rounded-none border-b-2">
      <CardContent className="flex justify-between pb-0 py-6">
        <div>
        <Image
            src="/logo.png"
            alt="Logo Nextcut"
            width={256}
            height={256}
            className="w-2/5 max-w-36"
          />
        </div>
        {session ? (
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="px-2" variant={"outline"}><Menu /></Button>
              </SheetTrigger>
              <SheetContent>
                <SideMenu />
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div>
            <Button asChild
              className="flex gap-1 text-primary border-primary"
              size={"sm"}
              variant={"outline"}
            >
              <Link href="/login">
                Entrar
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
