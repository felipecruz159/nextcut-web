'use client'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";

import { CalendarClock, Heart, Home, LogOutIcon, User2 } from "lucide-react";

import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "./ui/dropdown-menu"

const SideMenu = () => {
   const { data: session, status } = useSession();

   const getInitials = (fullName: string) => {
      const parts = fullName.split(' ');

      if (parts.length === 1) {
         return parts[0].slice(0, 2);
      }

      const name = parts[0];
      const lastName = parts[parts.length - 1];
      const initials = name[0] + lastName[0];

      return initials;
   }

   return (
      <div>
         <SheetHeader className="border-b mb-4 p-4">
            <SheetTitle>Menu</SheetTitle>
         </SheetHeader>
         {session?.user && (
            <div className="flex items-center mb-4">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button className="w-full bg-transparent hover:bg-transparent justify-start p-0 text-start">
                        <div className="flex items-center gap-2 ">
                           <Avatar className="w-8 h-8">
                              <AvatarImage src={`${session.user.image}`} alt="Image User" />
                              <AvatarFallback>{session.user.name ? getInitials(session.user.name) : "AV"}</AvatarFallback>
                           </Avatar>
                           <div>
                              <p className="text-md">{session.user.name}</p>
                              <p className="text-sm text-muted-foreground">{session.user.email}</p>
                           </div>
                        </div>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                     <DropdownMenuLabel>Informações da conta</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <Button className="w-full bg-transparent hover:bg-transparent gap-3 justify-start px-2" size={"icon"} onClick={() => signOut({ callbackUrl: '/' })}>
                        <LogOutIcon /> Sair da conta
                     </Button>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         )}
         <div>
            <div className='flex flex-col gap-2  items-center'>
               <Button asChild variant={'outline'} className="w-full gap-2 justify-start border-none">
                  <Link href='/'><Home size={20} /> Início</Link>
               </Button>
               <Button asChild variant={'outline'} className="w-full gap-2 justify-start border-none">
                  <Link href='/'><User2 size={20} /> Perfil</Link>
               </Button>
               <Button asChild variant={'outline'} className="w-full gap-2 justify-start border-none">
                  <Link href='/'><CalendarClock size={20} /> Agenda</Link>
               </Button>
               <Button asChild variant={'outline'} className="w-full gap-2 justify-start border-none">
                  <Link href='/'><Heart size={20} /> Favoritos</Link>
               </Button>
            </div>
         </div>
      </div>
   );
}

export default SideMenu;