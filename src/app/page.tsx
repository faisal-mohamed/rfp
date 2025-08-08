

"use client";

import { useEffect } from "react";
import { isAuthed } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (isAuthed()) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);
  return null;
}
