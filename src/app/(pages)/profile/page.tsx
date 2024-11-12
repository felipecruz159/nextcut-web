"use client";
import AlternativeHeader from "@/app/_components/alternativeHeader";
import { Separator } from "@/app/_components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import ProfileBadge from "./_components/badge";
import { Pencil } from "lucide-react";
import { History } from "@/app/_components/history";
import { useSession } from "next-auth/react";
import { countBookings } from "@/app/api/client/bookings/countBookings";
import { useEffect, useState } from "react";

const getInitials = (fullName: string) => {
  const parts = fullName.split(" ");
  return parts.length === 1
    ? parts[0].slice(0, 2)
    : parts[0][0] + parts[parts.length - 1][0];
};

export const Profile = () => {
  const { data: session } = useSession();
  const [bookingsRealized, setBookingsRealized] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await countBookings({
          email: session?.user?.email || "",
        });
        setBookingsRealized(result.totalBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

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
            // TODO: Fix this
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
        <div className="flex justify-between text-muted-foreground text-sm font-bold mt-1">
          {/* // TODO: Name is not refreshing according to database, maybe create a function that returns the name from the database */}
          <p className="">{session?.user?.email}</p>
          <div className="flex gap-1">
            <Link href="#">
              {/* <p className="hover:text-primary hover:underline cursor-pointer font-light"> */}
              <p className="cursor-auto">{bookingsRealized} agendamentos</p>
            </Link>
            {/* //? What else to put in here? */}
            {/* <p>•</p>
            <p>404 posts</p> */}
          </div>
        </div>
      </section>
      <Separator className="mt-5" />
      <section className="mt-5 px-8">
        <h1 className="font-bold md:text-4xl text-lg mb-4">Histórico</h1>
        <History email={session?.user?.email || ""} />
      </section>
    </>
  );
};

export default Profile;
