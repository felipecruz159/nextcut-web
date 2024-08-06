'use client'
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"


const SideMenu = () => {
   const { data: session, status } = useSession();

   return (
      <div>
         <SheetHeader className="border-b mb-4 p-4">
            <SheetTitle>Menu</SheetTitle>
         </SheetHeader>
         {session?.user && (
            <div className="flex justify-between items-center px-5 py-6">
               <div className="flex items-center gap-2 ">
                  Conta:
                  <div>
                     {session.user.email}
                  </div>
               </div>
               <div>
                  <Button size={"icon"} onClick={() => signOut({ callbackUrl: '/' })}>
                     <LogOutIcon />
                  </Button>
               </div>
            </div>
         )}
         <div>
            <div className='flex flex-col gap-5  items-center'>
               <Button asChild variant={'outline'} className="w-full">
                  <Link href='/'>Início</Link>
               </Button>
            </div>
         </div>
      </div>
   );
}

export default SideMenu;