import { useRouter } from "next/router";
import { FaXTwitter } from "react-icons/fa6";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="
        flex 
        h-14
        w-14
        cursor-pointer 
        items-center 
        justify-center 
        rounded-full 
        p-4 
        hover:bg-blue-300 
        hover:bg-opacity-10
    "
    >
      <FaXTwitter size={28} color="white" />
    </div>
  );
};

export default Logo;
