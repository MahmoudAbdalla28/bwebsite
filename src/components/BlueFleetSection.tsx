"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
import networkData from "../../public/assets/lottie/network-nodes.json";

const agents = [
  { id: "sera", label: "Sera", x: 160, y: 50, divergent: false },
  { id: "operator", label: "Operator", x: 300, y: 130, divergent: true },
  { id: "recon", label: "Recon", x: 80, y: 180, divergent: false },
  { id: "bastion", label: "Bastion", x: 250, y: 260, divergent: false },
  { id: "atlas", label: "Atlas", x: 50, y: 310, divergent: false },
];

const connections = [
  ["sera", "operator"],
  ["sera", "recon"],
  ["operator", "bastion"],
  ["recon", "bastion"],
  ["recon", "atlas"],
  ["bastion", "atlas"],
  ["sera", "bastion"],
];

function FleetTopology({ active }: { active: boolean }) {
  const agentMap = Object.fromEntries(agents.map((a) => [a.id, a]));

  return (
    <svg viewBox="0 0 380 370" className="w-full max-w-sm mx-auto" fill="none">
      {/* Connection lines */}
      {connections.map(([from, to], i) => {
        const a = agentMap[from];
        const b = agentMap[to];
        const isDivergentLine = a.divergent || b.divergent;
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isDivergentLine ? "#DC2626" : "#0D6EFD"}
            strokeWidth={isDivergentLine ? 2 : 1}
            strokeOpacity={isDivergentLine ? 0.5 : 0.2}
            strokeDasharray={isDivergentLine ? "4 4" : "none"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
          />
        );
      })}

      {/* Agent nodes */}
      {agents.map((agent, i) => (
        <g key={agent.id}>
          {/* Pulse ring for divergent agent */}
          {agent.divergent && active && (
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              r={24}
              fill="none"
              stroke="#DC2626"
              strokeWidth="1.5"
              initial={{ r: 18, opacity: 0.8 }}
              animate={{ r: 30, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.circle
            cx={agent.x}
            cy={agent.y}
            r={18}
            fill={agent.divergent ? "#FEF2F2" : "#EFF6FF"}
            stroke={agent.divergent ? "#DC2626" : "#0D6EFD"}
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
          />
          <motion.text
            x={agent.x}
            y={agent.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[9px] font-semibold"
            fill={agent.divergent ? "#DC2626" : "#0D6EFD"}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            {agent.label}
          </motion.text>

          {/* Label below */}
          {agent.divergent && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <rect x={agent.x - 42} y={agent.y + 24} width={84} height={18} rx={4} fill="#FEF2F2" stroke="#DC2626" strokeWidth="0.5" />
              <text x={agent.x} y={agent.y + 36} textAnchor="middle" dominantBaseline="middle" className="text-[8px] font-semibold" fill="#DC2626">
                Divergent behavior
              </text>
            </motion.g>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function BlueFleetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: topology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-border bg-white p-6 shadow-lg shadow-black/5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-dim">Fleet Topology</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[9px] text-text-dim">Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red" />
                  <span className="text-[9px] text-text-dim">Divergent</span>
                </div>
              </div>
            </div>
            <FleetTopology active={isInView} />
          </motion.div>

          {/* Right: copy + Lottie */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm font-semibold text-primary">Fleet Intelligence</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Fleet-level signals catch what individual monitoring misses
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                An agent that looks perfectly normal on its own might be the only one in your fleet calling a specific tool, or making requests at an unusual time. Blue correlates behavior across the entire fleet, not just against each agent's own history.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 space-y-3"
            >
              {[
                {
                  title: "Cross-agent correlation",
                  desc: "If one agent starts using tools no other agent has ever used, that is a much stronger signal than individual baseline deviation alone.",
                },
                {
                  title: "Behavioral drift detection",
                  desc: "Track how each agent's behavior changes over time relative to the fleet. Gradual drift gets caught before it becomes a problem.",
                },
                {
                  title: "Coordinated anomaly detection",
                  desc: "Multiple agents behaving unusually at the same time can indicate a systemic issue, whether that is a bad model update or something more serious.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <p className="text-sm font-semibold text-text">{item.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <Lottie animationData={networkData} loop className="w-32 h-32" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
