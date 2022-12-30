import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuthentication = () => {
  return () => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
      console.log("hello", user);
      if (!user) {
        router.push("/api/auth/login");
      }
    }, []);
  };
};
