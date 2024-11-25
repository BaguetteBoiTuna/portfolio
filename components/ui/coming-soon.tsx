import React from "react";
import Navbar from "@/components/ui/navbar";

const ComingSoon = () => {
  return (
    <div className="flex w-full h-screen flex-col">
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-6xl font-extrabold text-center">Coming Soon :)</h1>
      </div>
    </div>
  );
};

export default ComingSoon;
