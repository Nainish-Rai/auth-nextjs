import React from "react";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  return (
    <div className="w-full h-screen  flex justify-center items-center selection:bg-teal-900 ">
      <div className="flex items-end">
        <span className="scroll-m-20 text-4xl font-semibold tracking-tight">
          Welcome
        </span>
        <span className="mx-4 text-teal-500 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          {params.id}
        </span>
      </div>
    </div>
  );
};

export default page;
