import React, { type ReactNode } from "react";
import Sidebar from "./sidebar";
import RightBar from "./rightBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-black">
      <div className="xl:px-30 container mx-auto h-full max-w-6xl">
        <div className="grid h-full grid-cols-4">
          <Sidebar />
          <div className="border-x-1 col-span-3 h-full overflow-y-auto border-neutral-700">
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
