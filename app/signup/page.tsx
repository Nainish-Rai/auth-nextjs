import React from "react";
import { SignupCard } from "../components/SignupCard";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <SignupCard />
    </main>
  );
};

export default page;
