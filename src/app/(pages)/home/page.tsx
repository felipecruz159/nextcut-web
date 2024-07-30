import Header from "../../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import Categories from "./_components/categories";
import BookingItem from "./_components/booking";
import Cards from "./_components/cards";
import { getServerSession } from "next-auth";


export default async function Home() {
  const session = await getServerSession();

  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:container mx-5 mt-6 gap-x-4">
        <div className="mt-4 ">
          {session && session.user ? (
            <h2 className="text-xl font-light">Olá, {session.user.name}!</h2>
          ) : (
            <h2 className="text-xl font-light">Olá!</h2>
          )}

          <div className="flex">
            <div>
              <p className="text-muted-foreground text-sm capitalize">
                {format(new Date(), "iii", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                {format(new Date(), "',' d 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>

          <div className=" mt-6">
            <Search />
          </div>
        </div>

        {/* Card hidden below the "md" splint */}
        <div className=" md:w-full row-span-2 content-center mt-2 md:mt-0">
          <BookingItem />
        </div>

        <div className="mt-4">
          <h2 className="uppercase text-base text-muted-foreground mb-3">
            Categorias
          </h2>
          <div className="flex flex-row gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
            <Categories />
          </div>
        </div>
      </div>

      <Cards />
    </div>
  );
}
