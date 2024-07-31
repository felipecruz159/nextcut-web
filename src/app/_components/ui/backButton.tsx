'use client'
import { Button } from "@ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ className, text, ...props }: any) => {

   const router = useRouter();
   const handleBack = () => {
      router.back();
   };

   return (
      <Button onClick={handleBack} className={`${className} bg-stone-900/70 hover:bg-stone-900/100 px-3 rounded-full`}  {...props}>
         <ArrowLeft />
         {text}
      </Button>
   );
};

export default BackButton;
