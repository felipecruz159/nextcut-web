import { Button } from "@/app/_components/ui/button";
import { PiScissors } from "react-icons/pi";
import { GiBeard, GiHandOk } from "react-icons/gi";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { BsStars } from "react-icons/bs";

const categories = [
   { value: "cabelo", label: "Cabelo" },
   { value: "barba", label: "Barba" },
   { value: "rosto", label: "Beleza" },
   { value: "estetica", label: "Estética" },
   { value: "unhas", label: "Unhas" },
   { value: "eventos", label: "Eventos" }
];

const getIcon = (icon: string) => {
   switch (icon) {
      case "cabelo":
         return <PiScissors className="w-5 h-5 text-white" />;
      case "barba":
         return <GiBeard className="w-5 h-5 text-white" />;
      case "rosto":
         return <MdOutlineFaceRetouchingNatural className="w-5 h-5 text-white" />;
      case "estetica":
         return <MdOutlineFaceRetouchingNatural className="w-5 h-5 text-white" />;
      case "unhas":
         return <GiHandOk className="w-5 h-5 text-white" />;
      case "eventos":
         return <BsStars className="w-5 h-5 text-white" />;
      default:
         return null;
   }
};

const Categories = () => {
   return (
      <div className="flex space-x-4">
         {categories.map((category) => (
            <div
               key={category.value}
               className="max-w-[75px] max-h-[85px] min-w-[75px] min-h-[85px] text-center"
            >
               <Button
                  className={`max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] px-0 ${category.value !== "cabelo" && category.value !== "barba" ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={category.value !== "cabelo" && category.value !== "barba"}
               >
                  {getIcon(category.value)}
               </Button>
               <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-muted-foreground mt-1">
                  {category.label}
               </p>
            </div>
         ))}
      </div>
   );
};

export default Categories;
