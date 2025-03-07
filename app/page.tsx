"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = getToken();

    // If token exists, redirect to home page
    // Otherwise redirect to login page
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
