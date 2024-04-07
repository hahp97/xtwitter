import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

const Avatar = ({ userId }: { userId?: string }) => {
  const router = useRouter();

  // const { data } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId],
  );

  return (
    <div
      className={`
            relative 
            h-12 w-12
            cursor-pointer 
            rounded-full
            border-4
            border-black 
            transition
            hover:opacity-90
          `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={"/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
