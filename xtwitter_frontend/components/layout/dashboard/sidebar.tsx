import Link from 'next/link';
import SideBarRouter from './sidebarRouter';
import { BsTwitterX } from 'react-icons/bs';
import ProfileButton from './profileButton';

const SideBar = () => {
  return (
    <div className="h-[100%] overflow-y-auto hidden border-r-2 lg:w-1/4 md:w-2/5 md:max-w-[350px] p-4 shadow-lg md:flex md:flex-col justify-between">
      <div>
        <div className="pl-4">
          <BsTwitterX />
        </div>
        <SideBarRouter />
      </div>
      <ProfileButton />
    </div>
  );
};

export default SideBar;
