import Header from "@/app/_components/header";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";

const LearnMore = () => {
   return (
      <div>
         <Header />

         <main>
            <div className="hidden lg:block w-full relative">
               <div className="absolute w-full h-full max-h-max flex justify-center items-center">
                  <div className="md:w-8/12 flex-col justify-center items-center ">
                     <h1 className="text-background font-bold md:text-7xl text-lg text-center mb-4">Lorem ipsum dolor sit amet consectetur </h1>
                     <p className="text-background font-semibold md:text-2xl text-md text-center mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam quos a doloribus laboriosam est voluptatibus !</p>
                     <div className="flex gap-3">
                        <Button>Entrar na parceiria</Button>
                        <Button>Não tenho interesse</Button>
                     </div>
                  </div>
               </div>
               <Image src='/assets/temp.jpg' width={10000} height={1000} alt="image" className="object-cover m-auto max-h-[80vh]" />
            </div>
         </main>
      </div>
   );
}

export default LearnMore;