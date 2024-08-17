import { Button } from "@/app/_components/ui/button";
import Image from "next/image";

const Summary = () => {
  return (
    <div className="w-100 container hidden lg:flex">
      <div className="w-2/5 flex-col">
        <div className="w-100 h-2/5">
          <Image
            src="/assets/temp.jpg"
            width={10000}
            height={1000}
            alt="image"
            className="object-cover m-auto h-full brightness-50 rounded-3xl p-1 border-transparent"
          />
        </div>
        <div className="flex flex-row w-100 h-3/5 ">
          <div className="w-2/4 flex flex-col">
            <h1 className="text-center font-bold">Nos siga nas redes!</h1>
            <div className="flex flex-row text-center h-2/5 items-center">
              <Button className="w-2/4 bg-black rounded-3xl h-5/6 m-1 p-2 border-transparent">
                A
              </Button>
              <Button className="w-2/4 bg-black rounded-3xl h-5/6 m-1 p-2 border-transparent">
                B
              </Button>
            </div>
            <div className="h-3/5 bg-black rounded-3xl m-1 p-2 border-transparent">
              <h1 className="font-bold md:text-xl ps-1 pt-2">Item 3</h1>
              <p className="font-light ps-1 pb-2 text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                beatae perferendis earum tempore cumque consequuntur
                accusantium, ipsa accusamus reprehenderit laudantium tenetur
                dolorum dolore facere veritatis in, animi velit eius at.
              </p>
            </div>
          </div>
          <div className="w-2/4 bg-primary rounded-3xl m-1 p-2 border-transparent flex flex-col items-center">
            <h1 className="font-bold text-wrap text-lg flex align-start">
              Contamos com mais de...
            </h1>
            <div className="flex-grow flex flex-col items-center justify-center w-full">
              <h1 className="font-bold text-center text-5xl">0</h1>
              <p className="text-base">Estabelecimentos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/5 flex flex-col">
        <div className="flex flex-row ">
          <div className="w-2/4 flex flex-col justify-between bg-black rounded-3xl m-1 p-2 border-transparent">
            <h1 className="font-bold md:text-xl ps-1 pt-2">Nossa história</h1>
            <p className="font-light ps-1 pb-2 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              beatae perferendis earum tempore cumque consequuntur accusantium,
              ipsa accusamus reprehenderit laudantium tenetur dolorum dolore
              facere veritatis in, animi velit eius at. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ipsam aliquid magnam debitis
              non quasi voluptatum quae nihil, esse repellat accusantium, harum
              dolores eius facere error dicta unde dolor, impedit velit? Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Officia,
              fugiat. Assumenda vel doloremque itaque aliquid, blanditiis rerum
              ullam nesciunt distinctio tempore sed dolores temporibus, harum
              velit aspernatur suscipit incidunt iure?
            </p>
          </div>
          <div className="flex flex-col w-2/4 h-[300px]">
            <div className="flex flex-col justify-between h-2/4 bg-black rounded-3xl m-1 p-2 border-transparent">
              <h1 className="font-bold md:text-xl ps-1 pt-2">Missão</h1>
              <p className="font-light ps-1 pb-2 text-xs">
                Facilitar e otimizar a experiência de agendamento de serviços de
                beleza, conectando clientes e profissionais de forma prática e
                eficiente, garantindo conveniência, qualidade e satisfação para
                todos os envolvidos.
              </p>
            </div>
            <div className="flex flex-col justify-between h-2/4 bg-black rounded-3xl m-1 p-2 border-transparent">
              <h1 className="font-bold md:text-xl ps-1 pt-2">Visão</h1>
              <p className="font-light ps-1 pb-2 text-xs">
                Ser a plataforma líder no mercado de agendamento de serviços de
                beleza, reconhecida pela inovação, confiabilidade e excelência
                no atendimento, proporcionando uma experiência personalizada e
                simplificada para usuários em todo o Brasil.
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <Image
            src="/assets/temp.jpg"
            width={10000}
            height={1000}
            alt="image"
            className="object-cover m-auto brightness-50 rounded-3xl p-1 border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
