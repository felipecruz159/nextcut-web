import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
   return (
      <div className="flex flex-row itmes-center gap-2 ">
         <Input placeholder="Busque por uma barbearia..." />
         <Button className="bg-primary px-3">
            <SearchIcon />
         </Button>
      </div>
   );
}

export default Search;