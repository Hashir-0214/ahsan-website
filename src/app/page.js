// src/app/page.js

"use client";

import Hero from "@/components/home/Hero";
import Vision from "@/components/home/Vision";
import Team from "@/components/home/Committee";
import Programs from "@/components/home/Programs";
import Mission from "@/components/home/Misson";
import Publications from "@/components/home/Publications";
import HomeVotingPopup from "@/components/voting/HomeVotingPopup";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 via-white to-violet-50 overflow-hidden poppins-regular">
      <Hero />
      <Vision />
      <Mission />
      <Publications />
      <Programs />
      <Team />
      <HomeVotingPopup />
    </div>
  );
}