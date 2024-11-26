import React from "react";
import Navbar from "@/components/ui/navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const ComingSoon = () => {
  return (
    <div className="flex w-full h-screen flex-col">
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-6xl font-extrabold text-center">Coming Soon :)</h1>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
};

export default ComingSoon;
