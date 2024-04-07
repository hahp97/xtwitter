import { GetUserById } from "@/apis/user";
import useSWR from "swr";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    () => GetUserById(userId),
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
