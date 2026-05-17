"use client";

import { motion } from "framer-motion";
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-black"
    >
      <Nav />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </motion.div>
  );
}
