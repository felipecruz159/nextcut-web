import Image from "next/image";
import BackButton from "@/app/_components/ui/backButton";

type AlternativeHeaderProps = { 
  variant: 'logo' | 'title' | 'both'
  title?: string;
}

export const AlternativeHeader = ({variant, title}: AlternativeHeaderProps) => {

  const LogoHeader = () => (
  <>
    <div className="col-span-3 md:col-span-1 place-content-center">
      <div className="absolute top-6 left-6 ">
        <BackButton />
      </div>
      <div className="flex justify-center mt-4">
        <Image
          src="/logo.png"
          alt="Logo Nextcut"
          width={256}
          height={256}
          className="w-2/5 max-w-36"
        />
      </div>
    </div>
  </>
  );

  // TODO: Make only title header
  const TitleHeader = () => (
    <></>
  );

  // TODO: Make both title and logo header
  const BothTitleAndLogoHeader = () => (
    <></>
  )

  switch(variant){
    case 'logo':
      return <LogoHeader />;
    case 'title':
      return <TitleHeader />;
    case 'both': 
      return <BothTitleAndLogoHeader />;
  }
  
};

export default AlternativeHeader;
