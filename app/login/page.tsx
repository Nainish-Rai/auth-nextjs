import React from "react";
import { LoginCard } from "../components/LoginCard";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <LoginCard />
    </main>
  );
};

export default page;
