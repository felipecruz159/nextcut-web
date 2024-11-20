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
    <div className="col-span-3 md:col-span-1 place-content-center">
      <div className="absolute top-6 left-6">
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
  );

  // * Header with arrow back and title
  const TitleHeader = ({ title }: { title?: string }) => (
    <div className="col-span-3 md:col-span-1 place-content-center mb-6">
      <div className="absolute top-8 left-6">
        <BackButton />
      </div>
      <div className="flex justify-center mt-4 h-16 items-center">
        <h1 className="text-2xl">{title}</h1>
      </div>
    </div>
  );

  // * Header with arrow back, logo, and title
  const BothTitleAndLogoHeader = () => <></>;

  // * Header with only arrow back
  const ArrowHeader = () => (
    <div className="col-span-3 md:col-span-1 place-content-center z-50 absolute">
      <div className="absolute top-6 left-6">
        <BackButton />
      </div>
    </div>
  );

  switch (variant) {
    case "logo":
      return <LogoHeader />;
    case "title":
      return <TitleHeader title={title} />;
    case "both":
      return <BothTitleAndLogoHeader />;
    case "arrow":
      return <ArrowHeader />;
    default:
      return null;
  }
};

export default AlternativeHeader;
