"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  opacity: number;
  angle: number;
  speed: number;
  orbitRadius: number;
  layer: number;
}

// Cisco-inspired color palette — dots scattered across sphere
const PALETTE = {
  core: ["#0D6EFD", "#3B82F6", "#2563EB", "#60A5FA"],
  accent: ["#EC4899", "#F97316", "#06B6D4", "#8B5CF6"],
  neutral: ["#94A3B8", "#CBD5E1", "#64748B", "#1E293B"],
};

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);

  const createParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    const cx = w * 0.95;
    const cy = h * 0.45;
    const baseR = Math.min(w, h) * 0.42;

    // Dense core sphere
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * baseR * 0.75;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r * 0.82;

      const isAccent = Math.random() > 0.6;
      const colorSet = isAccent ? PALETTE.accent : PALETTE.core;
      particles.push({
        x, y, baseX: x, baseY: y,
        radius: 2 + Math.random() * 6,
        color: colorSet[Math.floor(Math.random() * colorSet.length)],
        opacity: 0.7 + Math.random() * 0.3,
        angle, speed: 0.001 + Math.random() * 0.003,
        orbitRadius: r, layer: 0,
      });
    }

    // Sphere edge ring
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = baseR * (0.7 + Math.random() * 0.35);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r * 0.82;

      const colorSet = Math.random() > 0.5 ? PALETTE.core : PALETTE.accent;
      particles.push({
        x, y, baseX: x, baseY: y,
        radius: 1.5 + Math.random() * 4.5,
        color: colorSet[Math.floor(Math.random() * colorSet.length)],
        opacity: 0.5 + Math.random() * 0.4,
        angle, speed: 0.0008 + Math.random() * 0.002,
        orbitRadius: r, layer: 1,
      });
    }

    // Scattered ambient dots — across the whole canvas
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x, y, baseX: x, baseY: y,
        radius: 1 + Math.random() * 4,
        color: PALETTE.neutral[Math.floor(Math.random() * PALETTE.neutral.length)],
        opacity: 0.15 + Math.random() * 0.35,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0005,
        orbitRadius: 0, layer: 2,
      });
    }

    // A few large accent dots scattered loosely
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = baseR * (1.2 + Math.random() * 0.8);
      const x = cx + Math.cos(angle) * dist + (Math.random() - 0.5) * w * 0.2;
      const y = cy + Math.sin(angle) * dist * 0.7 + (Math.random() - 0.5) * h * 0.2;

      particles.push({
        x, y, baseX: x, baseY: y,
        radius: 3 + Math.random() * 7,
        color: [...PALETTE.core, ...PALETTE.accent][Math.floor(Math.random() * 8)],
        opacity: 0.5 + Math.random() * 0.4,
        angle, speed: 0.0005, orbitRadius: 0, layer: 3,
      });
    }

    return particles;
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
      particlesRef.current = createParticles(rect.width, rect.height);
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
    const rect = canvas.getBoundingClientRect();

    const draw = () => {
      const w = rect.width;
      const h = rect.height;
      const cx = w * 0.63;
      const cy = h * 0.45;
      frameRef.current++;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update
      for (const p of particles) {
        if (p.layer <= 1) {
          p.angle += p.speed;
          const wobble = Math.sin(frameRef.current * 0.006 + p.angle * 2) * 1.5;
          p.x = cx + Math.cos(p.angle) * (p.orbitRadius + wobble);
          p.y = cy + Math.sin(p.angle) * (p.orbitRadius + wobble) * 0.82;
        } else {
          // Gentle float
          p.x += Math.sin(frameRef.current * 0.003 + p.baseX) * 0.15;
          p.y += Math.cos(frameRef.current * 0.003 + p.baseY) * 0.1;
          p.x += (p.baseX - p.x) * 0.01;
          p.y += (p.baseY - p.y) * 0.01;
        }

        // Mouse repel
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100 * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // Connection lines for core particles
      const core = particles.filter(p => p.layer <= 1);
      ctx.lineWidth = 0.4;
      for (let i = 0; i < core.length; i++) {
        for (let j = i + 1; j < core.length; j++) {
          const a = core[i], b = core[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 50) {
            const alpha = (1 - d / 50) * 0.08;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
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
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}
