"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import BinaryRain from "@/components/BinaryRain";
import CVViewer from "@/components/CVViewer";
import FloatingTerminal from "@/components/FloatingTerminal";
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Portfolio({
  onExit,
  visible = true,
}: {
  onExit?: () => void;
  visible?: boolean;
}) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen bg-black"
      >
        <BinaryRain dim />

        {/* CV Viewer â€” accessible from terminal AND contact section */}
        <CVViewer open={cvOpen} onClose={() => setCvOpen(false)} />

        {/* Floating terminal â€” ` to open */}
        <FloatingTerminal
          onOpenCV={() => setCvOpen(true)}
          onExit={onExit}
        />

        <Nav />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <Contact
            onOpenCV={() => setCvOpen(true)}
            onExit={onExit}
          />
        </main>
      </motion.div>
    </SmoothScrollProvider>
  );
}
