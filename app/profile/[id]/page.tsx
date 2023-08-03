"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  async function onLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen  flex flex-col justify-center items-center selection:bg-teal-900 ">
      <div className="flex items-end">
        <span className="scroll-m-20 text-4xl font-semibold tracking-tight">
          Welcome
        </span>
        <span className="mx-4 text-teal-500 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          {params.id}
        </span>
      </div>
      {/* Logout button */}
      <Button className="mt-5" onClick={() => onLogout()}>
        Logout
      </Button>
    </div>
  );
};

export default Page;
