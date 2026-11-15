"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroSceneLoader() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
