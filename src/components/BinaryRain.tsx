"use client";

import { useEffect, useRef } from "react";

export default function BinaryRain({ dim = false }: { dim?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimRef    = useRef(dim);
  dimRef.current  = dim;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FS = 14;
    let drops: number[] = [];

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.floor(canvas.width / FS) }, () =>
        -Math.floor(Math.random() * 50)
      );
    };
    init();
    window.addEventListener("resize", init);

    let raf: number;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const isDim = dimRef.current;
      ctx.font = `${FS}px "JetBrains Mono", monospace`;

      if (isDim) {
        /* Fade existing pixels to transparent without painting black */
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
        drops.forEach((y, i) => {
          const r = Math.random();
          const alpha = r > 0.93 ? 0.55 : r > 0.6 ? 0.22 : 0.10;
          ctx.fillStyle = `rgba(74,222,128,${alpha})`;
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * FS, y * FS);
          if (y * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
          else drops[i] = y + 1;
        });
      } else {
        ctx.fillStyle = "rgba(0,0,0,0.13)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drops.forEach((y, i) => {
          const r = Math.random();
          const alpha = r > 0.93 ? 0.90 : r > 0.65 ? 0.42 : 0.18;
          ctx.fillStyle = `rgba(74,222,128,${alpha})`;
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * FS, y * FS);
          if (y * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
          else drops[i] = y + 1;
        });
      }
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  );
}
