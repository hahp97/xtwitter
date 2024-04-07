import React, { useCallback } from "react";
import type { IconType } from "react-icons";
import { useRouter } from "next/router";

import { BsDot } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentuser";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem = ({
  label,
  icon: Icon,
  href,
  auth,
  onClick,
  alert,
}: SidebarItemProps) => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  4;

  // TODO: handle login modal

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div
        className="
        relative
        flex 
        h-14
        w-14
        cursor-pointer
        items-center
        justify-center 
        rounded-full
        p-4 
        hover:bg-slate-300 
        hover:bg-opacity-10 
      "
      >
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
      <div
        className="
        items-row
        relative 
        flex 
        cursor-pointer 
        items-center 
        gap-4 
        rounded-full 
        p-4 
        hover:bg-slate-300
        hover:bg-opacity-10
      "
      >
        <Icon size={24} color="white" />
        <p className="hidden text-xl text-white lg:block">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
