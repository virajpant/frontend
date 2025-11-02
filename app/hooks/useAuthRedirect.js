"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const publicRoutes = ["/login", "/register", "/"];
    const isPublic = publicRoutes.includes(pathname);

    if (!userId) {
      if (!isPublic) {
        router.replace("/login");
      } else if (pathname === "/") {
        router.replace("/login");
      }
    } else {
      if (pathname === "/") {
        router.replace("/dashboard");
      } else if (["/login", "/register"].includes(pathname)) {
        router.replace("/tasks");
      }
    }
  }, [router, pathname]);
}
