import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import SideBar from './sidebar';

const CoreDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="flex h-screen">
        <SideBar />
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
};

export default CoreDashboard;
