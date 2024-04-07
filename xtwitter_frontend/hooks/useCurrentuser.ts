import { getProfile } from "@/apis/auth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function useCurrentUser() {
  const token = cookies.get("token");

  const { data, error, isLoading, mutate } = useSWR("profile", () =>
    getProfile(token),
  );

  return { data, error, isLoading, mutate };
}
