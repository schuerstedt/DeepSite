/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookie } from "react-use";
import { useRouter } from "next/navigation";

import { User } from "@/types";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const useUser = (initialData?: {
  user: User | null;
  errCode: number | null;
}) => {
  const cookie_name = MY_TOKEN_KEY();
  const client = useQueryClient();
  const router = useRouter();
  const [, setCookie, removeCookie] = useCookie(cookie_name);
  const [currentRoute, setCurrentRoute] = useCookie("deepsite-currentRoute");

  const { data: { user, errCode } = { user: null, errCode: null }, isLoading } =
    useQuery({
      queryKey: ["user.me"],
      queryFn: async () => {
        return { user: initialData?.user, errCode: initialData?.errCode };
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      initialData: initialData
        ? { user: initialData?.user, errCode: initialData?.errCode }
        : undefined,
      enabled: false,
    });

  const { data: loadingAuth } = useQuery({
    queryKey: ["loadingAuth"],
    queryFn: async () => false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  const setLoadingAuth = (value: boolean) => {
    client.setQueryData(["setLoadingAuth"], value);
  };

  const openLoginWindow = async () => {
    setCurrentRoute(window.location.pathname);
    return router.push("/auth");
  };

  const loginFromCode = async (code: string) => {
    setLoadingAuth(true);
    if (loadingAuth) return;
    await api
      .post("/auth", { code })
      .then(async (res: any) => {
        if (res.data) {
          setCookie(res.data.access_token, {
            expires: res.data.expires_in
              ? new Date(Date.now() + res.data.expires_in * 1000)
              : undefined,
            sameSite: "none",
            secure: true,
          });
          client.setQueryData(["user.me"], {
            user: res.data.user,
            errCode: null,
          });
          if (currentRoute) {
            router.push(currentRoute);
            setCurrentRoute("");
          } else {
            router.push("/projects");
          }
          toast.success("Login successful");
        }
      })
      .catch((err: any) => {
        toast.error(err?.data?.message ?? err.message ?? "An error occurred");
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  };

  const logout = async () => {
    removeCookie();
    router.push("/");
    toast.success("Logout successful");
    client.setQueryData(["user.me"], {
      user: null,
      errCode: null,
    });
    window.location.reload();
  };

  return {
    user,
    errCode,
    loading: isLoading || loadingAuth,
    openLoginWindow,
    loginFromCode,
    logout,
  };
};
