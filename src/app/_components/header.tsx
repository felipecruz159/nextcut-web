import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@ui/card";
import { Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

export default async function Header() {
  const session = await getServerSession();

  return (
    <Card className="rounded-none border-b-2">
      <CardContent className="flex justify-between pb-0 py-6">
        <div>Logo</div>
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
