'use client'
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const ButtonGoogle = () => {
   return (
      <>
         <Button className="w-full gap-3" variant={"outline"} onClick={() => signIn('google', { callbackUrl: '/work-with-us' })}>
            <Image
               src="/media-icons/google.svg"
               alt="Google"
               width={25}
               height={25}
            />
            Logar com o Google
         </Button>
      </>
   );
}

export default ButtonGoogle;