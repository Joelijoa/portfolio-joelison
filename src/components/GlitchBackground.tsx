"use client";

import { useEffect, useRef } from "react";

const CELL     = 3;    // pixel block size
const DENSITY  = 0.10; // fraction of "lit" cells
const FPS      = 14;   // refresh rate

export default function GlitchBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    let last = 0;
    const interval = 1000 / FPS;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < interval) return;
      last = time;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const d = imageData.data;

      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const lit   = Math.random() < DENSITY;
          const brt   = lit ? (Math.random() * 180 + 60) : 0;
          const alpha = lit ? Math.floor(Math.random() * 22 + 6) : 0;

          for (let dy = 0; dy < CELL && row * CELL + dy < h; dy++) {
            for (let dx = 0; dx < CELL && col * CELL + dx < w; dx++) {
              const i = ((row * CELL + dy) * w + (col * CELL + dx)) * 4;
              d[i]     = brt;
              d[i + 1] = brt;
              d[i + 2] = brt;
              d[i + 3] = alpha;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
