import { Button } from "@/app/_components/ui/button";
import { Scissors } from "lucide-react";


const Categories = () => {
   return (
      <div >
         <div className="max-w-[75px] max-h-[85px] min-w-[75px] min-h-[85px] text-center ">
            <Button className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] px-0">
               <Scissors />
            </Button>
            <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-muted-foreground mt-1">Sombrancelhas</p>
            {/* // Divs representative */}
         </div>
      </div>
   );
}

export default Categories;