import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import Image from "next/image";
import { Card, CardContent } from "@ui/card";
import { Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const BenefitCard = () => {
  return (
    <Card className="max-w-[159px] min-w-[159px] w-full md:max-2-[300px] md:min-w-[300px]">
      <CardContent className=" p-1 rounded-xl">
        <div className="relative">
          <Image
            sizes="100vw"
            alt={'t'}
            width={0}
            height={0}
            className="h-[159px] w-[150px] md:w-[290px] object-cover rounded-xl"
            src={"/assets/1.jpg"}
          />
        </div>
        <div className="p-2">
          <h2 className="text-nowrap text-ellipsis overflow-hidden">{ }</h2>
          <p className="text-muted-foreground text-xs items-center overflow-hidden text-ellipsis text-nowrap">
            { }
          </p>
        </div>
        <div className="col-span-2 md:col-span-3 text-justify p-2">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ea distinctio sequi sunt, alias commodi accusantium, recusandae rerum a eos nisi assumenda voluptatum nobis reiciendis doloremque. Similique perspiciatis minus cum.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitCard;
