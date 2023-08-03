"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <Button
        onClick={() => {
          router.push(`/profile/${"nenix"}`);
        }}
      >
        See Dashboard
      </Button>
    </main>
  );
}
