import React, { useCallback, useContext, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { useRouter } from "next/router";

import { BsDot } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentuser";
import { useLoginModal } from "@/hooks/useModal";
import type { ModalBaseRef } from "@/components/modal";
import LoginModal from "@/components/modal/loginModal";

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

  const [openLoginModal, setOpenLoginModaal] = useState(false);

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      setOpenLoginModaal(true);
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, onClick, currentUser]);

  return (
    <>
      <div onClick={handleClick} className="flex flex-row items-center">
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
      {openLoginModal && (
        <LoginModal
          onClose={() => {
            setOpenLoginModaal(false);
          }}
        />
      )}
    </>
  );
};

export default SidebarItem;
