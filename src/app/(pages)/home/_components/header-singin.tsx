import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@ui/card";
import { DoorOpen } from 'lucide-react';

const HeaderSingin = () => {
   return (
      <Card className="rounded-none">
         <CardContent className="flex justify-between pb-0 py-6">
            <div>Logo</div>
            <div><Button className="flex gap-1 text-primary border-primary" size={"sm"} variant={"outline"}>
               Entrar <DoorOpen size={18} />
            </Button></div>
         </CardContent>
      </Card>
   );
}

export default HeaderSingin;