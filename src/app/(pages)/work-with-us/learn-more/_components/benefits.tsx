'use client';
import { Button } from '@/app/_components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Summary from './summary';
import { BenefitsList } from './benefits-list';
import YouTubeEmbed from '@/app/_components/YoutubeEmbed';

const Benefits = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);

  const scrollToBenefits = () => {
    if (benefitsRef.current) {
      benefitsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <div className="hidden sm:block w-full relative">
        {/* Tirado max-h-max, estava desalinhado verticalmente */}
        <div className="absolute w-full h-full flex justify-center items-center  z-10">
          <div className="md:w-8/12 flex-col justify-center items-center ">
            <h1 className=" font-bold md:text-5xl text-lg text-center mb-4">
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
          src="/assets/backgroundLearn-more1.jpg"
          width={10000}
          height={1000}
          alt="image"
          className="object-cover m-auto max-h-[80vh] brightness-50 z-0"
        />
      </div>
      <section className="mt-4 flex flex-col gap-10">
        <div className="container">
          <h1 className="font-bold md:text-2xl text-lg text-primary">
            Mas primeiro...
          </h1>
          <h1 className="font-bold md:text-4xl text-lg mb-4">
            Conheça a gente
          </h1>
          <Summary />
        </div>
        <div className="bg-[#000]">
          <div className="container flex flex-wrap justify-center p-5">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/_GSc3uAm8rQ?si=a3nSoefs1hMFwAYt"
              title="Apresentação Nextcut"
            />
            <YouTubeEmbed
              src="https://www.youtube.com/embed/Jr5-jrvhZj8?si=gP2A4IH9BZWxaixR"
              title="Apresentação Nextcut"
            />
          </div>
        </div>
        <div>
          <div
            className="container flex flex-col items-center"
            ref={benefitsRef}
          >
            <BenefitsList />
            <Button className="m-5">
              <Link href="/register-professional">Entrar para a Nextcut</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
