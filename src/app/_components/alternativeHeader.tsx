import Image from "next/image";
import BackButton from "@/app/_components/ui/backButton";

type AlternativeHeaderProps = {
  variant: "logo" | "title" | "both" | "arrow";
  title?: string;
};

export const AlternativeHeader = ({
  variant,
  title,
}: AlternativeHeaderProps) => {

  // * Header with arrow back and logo
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

  // * Header with arrow back and title
  // TODO: Make only title header
  const TitleHeader = () => <></>;

  // * Header with arrow back, logo and title
  // TODO: Make both title and logo header
  const BothTitleAndLogoHeader = () => <></>;

  // * Header with only arrow back
  const ArrowHeader = () => (
    <>
      <div className="col-span-3 md:col-span-1 place-content-center z-50 absolute">
        <div className="absolute top-6 left-6 ">
          <BackButton />
        </div>
      </div>
    </>
  );

  switch (variant) {
    case "logo":
      return <LogoHeader />;
    case "title":
      return <TitleHeader />;
    case "both":
      return <BothTitleAndLogoHeader />;
    case "arrow":
      return <ArrowHeader />;
  }
};

export default AlternativeHeader;
