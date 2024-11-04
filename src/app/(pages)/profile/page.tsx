import AlternativeHeader from "@/app/_components/alternativeHeader";
import { Separator } from "@/app/_components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ProfileBadge from "./_components/badge";
import { Pencil } from "lucide-react";

const getInitials = (fullName: string) => {
  const parts = fullName.split(" ");
  return parts.length === 1
    ? parts[0].slice(0, 2)
    : parts[0][0] + parts[parts.length - 1][0];
};

export const Profile = async () => {
  const session = await getServerSession();

  return (
    <>
      <div>
        <AlternativeHeader variant={"arrow"} />
      </div>
      <div id="banner" className="h-52 bg-primary container-fluid relative">
        <Image
          src="/assets/temp.jpg"
          width={1000}
          height={1000}
          alt="Banner Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Avatar className="double-border w-24 h-24 absolute bottom-[-32px] left-[4.5rem] transform -translate-x-1/2">
          {session?.user?.image ? (
            <AvatarImage
              src={session.user.image}
              alt="User Image"
              className="object-cover rounded-full"
            />
          ) : (
            <AvatarFallback className="rounded-full">
              {getInitials(session?.user?.name || "AV")}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
      <section
        id="schedulings-data"
        className="flex justify-end p-3 pe-6 text-muted-foreground"
      >
        <div>
          <Link href="/settings/account/account-info">
            <Pencil />
          </Link>
        </div>
      </section>
      <section id="profile-data" className="px-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <h1 className="text-xl font-bold">{session?.user?.name}</h1>
            <ProfileBadge />
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground text-sm font-bold">
          {/* // TODO: Name is not refreshing according to database, maybe create a function that returns the name from the database */}
          <p className="">{session?.user?.email}</p>
          {/* // TODO: Make it a count() function */}
          <div className="flex gap-1">
            <Link href="#">
              <p className="hover:text-primary hover:underline cursor-pointer font-light">
                47 agendamentos
              </p>
            </Link>
            {/* //? What else to put in here? */}
            {/* <p>•</p>
            <p>404 posts</p> */}
          </div>
        </div>
      </section>
      <Separator className="mt-5" />
    </>
  );
};

export default Profile;
