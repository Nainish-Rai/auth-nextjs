"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = React.useState(
    {} as { username: string; email: string; isVerified: boolean; _id: string }
  );
  React.useEffect(() => {
    axios.get("/api/users/me").then((res) => {
      setUserData(res.data.user);
    });
  }, []);
  console.log(userData);
  return (
    <main className="flex justify-center items-center w-full h-screen">
      {userData != undefined && (
        <Button
          onClick={() => {
            router.push(`/profile/${userData.username}`);
          }}
        >
          See Dashboard
        </Button>
      )}
    </main>
  );
}
