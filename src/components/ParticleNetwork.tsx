"use client";

import { useEffect, useRef, useCallback } from "react";

interface SphereDot {
  ux: number;
  uy: number;
  uz: number;
  color: string;
  baseRadius: number;
  baseOpacity: number;
  twinkle: number;
}

// Brand-aligned blue palette
const BLUES = [
  "#0D6EFD", "#3B82F6", "#1E40AF", "#60A5FA",
  "#1E40AF", "#1D4ED8", "#0EA5E9", "#93C5FD",
];

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<SphereDot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);

  const createDots = useCallback(() => {
    const dots: SphereDot[] = [];
    const N = 750;
    // Fibonacci sphere — even distribution
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const ux = Math.sin(phi) * Math.cos(theta);
      const uy = Math.sin(phi) * Math.sin(theta);
      const uz = Math.cos(phi);

      dots.push({
        ux, uy, uz,
        color: BLUES[Math.floor(Math.random() * BLUES.length)],
        baseRadius: 1.5 + Math.random() * 2.2,
        baseOpacity: 0.6 + Math.random() * 0.4,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = createDots();
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", () => { mouseRef.current = { x: -1000, y: -1000 }; });

    let animId: number;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      // Right of headline, vertically centered
      const cx = w * 0.74;
      const cy = h * 0.55;
      // Sphere radius — keep it contained on the right
      const baseR = Math.min(w, h) * 0.32;

      frameRef.current++;
      const f = frameRef.current;
      ctx.clearRect(0, 0, w, h);

      // Rotation around Y axis (slow)
      const angY = f * 0.004;
      const cosY = Math.cos(angY);
      const sinY = Math.sin(angY);
      // Tilt around X axis (small constant)
      const angX = 0.25;
      const cosX = Math.cos(angX);
      const sinX = Math.sin(angX);

      // Throbbing pulse
      const pulse = 1 + Math.sin(f * 0.025) * 0.05;
      const R = baseR * pulse;

      const dots = dotsRef.current;
      const projected: { x: number; y: number; z: number; r: number; o: number; color: string }[] = [];

      for (const d of dots) {
        // Rotate around Y
        const x1 = d.ux * cosY + d.uz * sinY;
        const z1 = -d.ux * sinY + d.uz * cosY;
        // Tilt around X
        const y2 = d.uy * cosX - z1 * sinX;
        const z2 = d.uy * sinX + z1 * cosX;

        const sx = cx + x1 * R;
        const sy = cy + y2 * R;

        // Depth-based size + opacity (z2 ranges -1 to 1, front = +1)
        const depth = (z2 + 1) / 2;
        const tw = 0.85 + Math.sin(f * 0.06 + d.twinkle) * 0.15;
        const r = d.baseRadius * (0.4 + depth * 0.9) * tw;
        const o = d.baseOpacity * (0.25 + depth * 0.75);

        projected.push({ x: sx, y: sy, z: z2, r, o, color: d.color });
      }

      // Sort back-to-front (painter's algorithm)
      projected.sort((a, b) => a.z - b.z);

      // Connection lines — only between front-facing close dots
      const front = projected.filter(p => p.z > 0);
      ctx.lineWidth = 0.4;
      for (let i = 0; i < front.length; i++) {
        for (let j = i + 1; j < front.length; j++) {
          const a = front[i], b = front[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 38) {
            const alpha = (1 - d / 38) * 0.12 * Math.min(a.z, b.z);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Mouse repel (front-facing only)
      const mouse = mouseRef.current;
      for (const p of projected) {
        if (p.z < 0) continue;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) / 80 * 4;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // Draw dots
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.o;
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [createDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}
