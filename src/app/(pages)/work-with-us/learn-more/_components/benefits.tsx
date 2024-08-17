"use client";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import BenefitCard from "./benefit-card";

const Benefits = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);

  const scrollToBenefits = () => {
    if (benefitsRef.current) {
      benefitsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="hidden lg:block w-full relative">
        <div className="absolute w-full h-full max-h-max flex justify-center items-center z-10">
          <div className="md:w-8/12 flex-col justify-center items-center ">
            <h1 className=" font-bold md:text-7xl text-lg text-center mb-4">
              Como a <span className="text-primary">Nextcut</span> pode te
              ajudar?
            </h1>
            <p className="font-semibold md:text-2xl text-md text-center mb-5">
              Veja os benefícios que você terá ao se tornar um afiliado
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={scrollToBenefits}>Ver os benefícios</Button>
              <Link href="/">
                <Button className="bg-background">Não tenho interesse</Button>
              </Link>
            </div>
          </div>
        </div>
        <Image
          src="/assets/temp.jpg"
          width={10000}
          height={1000}
          alt="image"
          className="object-cover m-auto max-h-[80vh] brightness-50 z-0"
        />
      </div>
      <div>
        <h1>Quem somos</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque veniam mollitia, veritatis magni inventore sunt! Architecto eos totam explicabo dignissimos vero earum mollitia magni molestiae, sapiente modi, quidem labore sunt!</p>
      </div>
      <hr />
      <div>
        <h1>Missão</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque veniam mollitia, veritatis magni inventore sunt! Architecto eos totam explicabo dignissimos vero earum mollitia magni molestiae, sapiente modi, quidem labore sunt!</p>
      </div>
      <hr />
      <div>
        <h1>Visão</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque veniam mollitia, veritatis magni inventore sunt! Architecto eos totam explicabo dignissimos vero earum mollitia magni molestiae, sapiente modi, quidem labore sunt!</p>
      </div>
      <hr />
      <div>
        <h1>Valor</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque veniam mollitia, veritatis magni inventore sunt! Architecto eos totam explicabo dignissimos vero earum mollitia magni molestiae, sapiente modi, quidem labore sunt!</p>
      </div>
      <div>
        <h1 ref={benefitsRef}>Benefícios</h1>
        <BenefitCard />
      </div>
    </>
  );
};

export default Benefits;
