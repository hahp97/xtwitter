import type { ReactNode } from 'react';

const LayoutPost = ({ children }: { children: ReactNode }) => {
  return <div className="w-full border-r min-h-screen ">{children}</div>;
};

export default LayoutPost;
