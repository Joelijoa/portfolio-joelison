"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GlitchBackground from "@/components/GlitchBackground";
import CVViewer from "@/components/CVViewer";
import FloatingTerminal from "@/components/FloatingTerminal";
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Portfolio({ onExit }: { onExit?: () => void }) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen bg-black"
      >
        <GlitchBackground />

        {/* CV Viewer — accessible from terminal AND contact section */}
        <CVViewer open={cvOpen} onClose={() => setCvOpen(false)} />

        {/* Floating terminal — ` to open */}
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
