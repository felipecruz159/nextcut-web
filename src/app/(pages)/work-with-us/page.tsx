import { Button } from "@/app/_components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WorkWithUs = () => {
   return (
      <div>
         <div className="h-screen container gap-6 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 place-content-center place-items-center" >
            <div className="col-span-1 row-span-1 max-w-96 md:max-w-max m-auto">
               <Image
                  src="/assets/viewLogin.svg"
                  alt="Imagem Login"
                  objectFit="contain"
                  width={1000}
                  height={1000} />
            </div>
            <div className="col-span-1 row-span-1 ">
               <div className="max-w-5xl">
                  <h1 className="text-3xl font-semibold mb-3">Trabalhe conosco!</h1>
                  <p className="text-xl ">Como um(a) profissional de beleza, você pode ser parceiro(a) NextCut! Ao se juntar à nossa plataforma,você pode expandir sua presença online e aumentar sua visibilidade!</p>
               </div>
               <div className=" flex gap-3 flex-col mt-12 sm:max-w-52 sm:flex-row">
                  <Button variant={"default"} asChild>
                     <Link href='/'>Não tenho interesse</Link>
                  </Button>
                  <Button className="gap-3" variant={"outline"} asChild>
                     <Link href='/work-with-us/learn-more'>Saiba Mais <ArrowRight size={18} /></Link>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default WorkWithUs;