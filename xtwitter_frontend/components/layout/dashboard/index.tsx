import React, { type ReactNode } from "react";
import Sidebar from "./sidebar";
import RightBar from "./rightBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container mx-auto h-full">
        <div className="grid h-full grid-cols-5">
          <Sidebar />
          <div className="col-span-3 h-full overflow-y-auto border-x-2 border-neutral-700">
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
