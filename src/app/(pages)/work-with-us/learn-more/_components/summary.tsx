import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import {
  Lightbulb,
  Award,
  Minus,
  Link as LinkIcon,
  Shield,
  UserCheck,
  Gauge,
  Eye,
  Zap,
} from "lucide-react";
import Value from "../types/Values";
const Summary = () => {
  const paths: string[] = [
    "https://instagram.com",
    "https://youtube.com",
    "https://linkedin.com",
    "https://x.com/home",
    "https://www.tiktok.com/pt-BR/",
  ];

  const mockValues: Value[] = [
    {
      name: "Inovação",
      icon: <Lightbulb />,
    },
    {
      name: "Eficiência",
      icon: <Gauge />,
    },
    {
      name: "Qualidade",
      icon: <Award />,
    },
    {
      name: "Simplicidade",
      icon: <Minus />,
    },
    {
      name: "Conectividade",
      icon: <LinkIcon />,
    },
    {
      name: "Resiliência",
      icon: <Shield />,
    },
    {
      name: "Foco no Cliente",
      icon: <UserCheck />,
    },
    {
      name: "Transparência",
      icon: <Eye />,
    },
    {
      name: "Agilidade",
      icon: <Zap />,
    },
  ];

  const isPathFilled: boolean = paths.length > 0 ? true : false;

  return (
    <div className="container sm:flex flex-col lg:flex-row">
      <div className="lg:w-2/5 w-full flex flex-col">
        <div className="hidden lg:block lg:h-2/5">
          <Image
            src="/assets/backgroundLearn-more2.jpg"
            width={10000}
            height={1000}
            alt="image"
            className="object-cover m-auto h-full brightness-50 rounded-3xl p-1 border-transparent"
          />
        </div>
        <div className="flex flex-row w-full lg:h-3/5 h-auto">
          <div className="w-full lg:w-2/4 flex flex-col">
            <h1 className="text-center font-bold text-xl mt-2 mb-2 hidden sm:block">
              Nos siga nas redes!
            </h1>
            <div className="sm:flex flex-wrap text-center items-center justify-center gap-1 mb-2 hidden">
              {isPathFilled ? (
                paths.map((path: string) => {
                  return (
                    <Button
                      key={path}
                      className="w-1/4 bg-black rounded-xl p-0 border-transparent"
                    >
                      <SocialIcon
                        url={path}
                        key={path}
                        bgColor="none"
                        style={{ width: 30 }}
                        target="_blank"
                      />
                    </Button>
                  );
                })
              ) : (
                <div className="bg-black rounded-3xl p-3 border-transparent">
                  <p>Nenhuma rede social encontrada!</p>
                </div>
              )}
            </div>
            <div className="lg:h-4/5 bg-black rounded-3xl m-1 p-2 border-transparent flex">
              <div className="flex-grow flex flex-col items-center justify-center">
                <Link
                  href="/"
                  className="flex flex-col items-center hover:text-primary transition delay-75"
                >
                  <h1 className="font-bold text-xl mb-2">Lançamento em breve!</h1>
                  <p className="font-light  text-md">Fique de olho!</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/4 bg-primary rounded-3xl m-1 p-2 border-transparent flex flex-col items-center">
            <div className="flex-grow flex flex-col items-center justify-center">
              <h1 className="font-bold text-center text-5xl">0+</h1>
              <p className="text-base text-center">Estabelecimentos cadastrados</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-3/5 w-full flex flex-col">
        <div className="flex flex-row flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-2/4  bg-black rounded-3xl m-1 p-2 border-transparent">
            <h1 className="font-bold text-xl mb-2">Nossos valores</h1>
            <div className="flex flex-wrap justify-evenly gap-1">
              {mockValues.map((value: Value) => {
                return (
                  <Button
                    key={value.name}
                    className="bg-black w-28 h-24 text-wrap border border-muted flex flex-col"
                  >
                    <div className="m-2">{value.icon}</div>
                    <p>{value.name}</p>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-2/4">
            <div className="flex flex-col justify-between h-2/4 bg-black rounded-3xl m-1 p-2 border-transparent">
              <h1 className="font-bold text-xl mb-2">Missão</h1>
              <p className="font-light text-xs">
                Facilitar e otimizar a experiência de agendamento de serviços de
                beleza, conectando clientes e profissionais de forma prática e
                eficiente, garantindo conveniência, qualidade e satisfação para
                todos os envolvidos.
              </p>
            </div>
            <div className="flex flex-col justify-between h-2/4 bg-black rounded-3xl m-1 p-2 border-transparent">
              <h1 className="font-bold text-xl mb-2">Visão</h1>
              <p className="font-light text-xs">
                Ser a plataforma líder no mercado de agendamento de serviços de
                beleza, reconhecida pela inovação, confiabilidade e excelência no
                atendimento, proporcionando uma experiência personalizada e
                simplificada para usuários em todo o Brasil.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            src="/assets/backgroundLearn-more3.jpg"
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
