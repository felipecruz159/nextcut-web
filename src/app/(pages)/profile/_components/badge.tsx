"use client";
import { Badge } from "@/app/_components/ui/badge";
import { useState } from "react";

// TODO: Change entire component after premium logic works (make isPremium come from user/sessions)
export const ProfileBadge = () => {
  const [badge, setBadgeState] = useState(false);

  const handleClick = () => {
    setBadgeState(!badge);
  };

  if (badge) {
    return (
      <Badge
        variant={"outline"}
        className="p-1 px-2 rounded-full text-primary border-primary cursor-pointer"
        onClick={handleClick}
      >
        PRO
      </Badge>
    );
  } else {
    return (
      <Badge
        variant={"outline"}
        className="p-1 px-2 rounded-full text-muted-foreground border-muted cursor-pointer"
        onClick={handleClick}
      >
        Torne-se PRO
      </Badge>
    );
  }
};

export default ProfileBadge;
