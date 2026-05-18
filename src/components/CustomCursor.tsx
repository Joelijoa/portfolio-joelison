"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX  = useSpring(mx, { stiffness: 800, damping: 50 });
  const dotY  = useSpring(my, { stiffness: 800, damping: 50 });
  const ringX = useSpring(mx, { stiffness: 180, damping: 30 });
  const ringY = useSpring(my, { stiffness: 180, damping: 30 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove  = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true); };
    const onOver  = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label, [tabindex]"
      );
      setHovering(!!el);
    };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* Dot — follows precisely */}
      <motion.div
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9999,
          width:      hovering ? 6 : 4,
          height:     hovering ? 6 : 4,
          borderRadius: "50%",
          background: hovering ? "#4ade80" : "#ffffff",
        }}
        animate={{ scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.08 }}
      />

      {/* Ring — lags behind */}
      <motion.div
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9998,
          borderStyle: "solid",
        }}
        animate={{
          width:       clicking ? 18 : hovering ? 38 : 26,
          height:      clicking ? 18 : hovering ? 38 : 26,
          borderColor: hovering ? "rgba(74,222,128,0.6)" : "rgba(255,255,255,0.25)",
          borderWidth: 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}
