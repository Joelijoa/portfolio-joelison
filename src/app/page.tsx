"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import CompromiseScreen from "@/components/CompromiseScreen";
import Portfolio from "@/components/Portfolio";

type Phase = "landing" | "compromising" | "portfolio";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("landing");

  // Lock scroll during landing + compromise, unlock for portfolio
  useEffect(() => {
    if (phase === "portfolio") {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const handleEnter = () => setPhase("compromising");
  const handleCompromiseComplete = () => setPhase("portfolio");
  const handleExit = () => {
    window.scrollTo({ top: 0 });
    setPhase("landing");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "landing" && (
          <LandingPage key="landing" onEnter={handleEnter} />
        )}
        {phase === "compromising" && (
          <CompromiseScreen key="compromise" onComplete={handleCompromiseComplete} />
        )}
      </AnimatePresence>

      {/* Portfolio is always mounted but visually hidden until phase === portfolio */}
      {phase === "portfolio" && <Portfolio onExit={handleExit} />}
    </>
  );
}
