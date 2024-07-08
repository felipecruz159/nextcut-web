import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@ui/card";
import { DoorOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default async function Header() {
  const session = await getServerSession();

  return (
    <Card className="rounded-none">
      <CardContent className="flex justify-between pb-0 py-6">
        <div>Logo</div>

        {/* 
         // TODO: Create header for user logged in
      */}
        {session ? (
          <div>
            <Button
              className="flex gap-1 text-primary border-primary"
              size={"sm"}
              variant={"outline"}
            >
              Logado <DoorOpen size={18} />
            </Button>
          </div>
        ) : (
          <div>
            <Button asChild
              className="flex gap-1 text-primary border-primary"
              size={"sm"}
              variant={"outline"}
              
            >
              <Link href="/login">
              Entrar <DoorOpen size={18} />
            </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
