import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import Logo from "../../logo";
import SidebarItem from "./item";
import useCurrentUser from "@/hooks/useCurrentuser";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/user/${currentUser?.username}`,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4">
      <div className="flex flex-col items-end">
        <div className="w-[230px] space-y-2">
          <Logo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {/* TODO: handle signout */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
