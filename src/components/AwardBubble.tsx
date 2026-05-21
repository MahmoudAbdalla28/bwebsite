"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AwardBubble() {
  const pathname = usePathname();

  // Only render on the homepage — hide on /platform, /insurance, /compliance, etc.
  if (pathname !== "/" && pathname !== "") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30"
    >
      <div
        className="border-b flex items-center justify-center gap-3 px-4 py-2.5 md:py-3"
        style={{
          backgroundColor: "#4d1b6e",
          borderColor: "rgba(237, 228, 211, 0.18)",
          boxShadow: "0 10px 24px -10px rgba(77, 27, 110, 0.45)",
        }}
      >
        {/* Trophy icon */}
        <div
          className="shrink-0 h-6 w-6 rounded-md inline-flex items-center justify-center"
          style={{ backgroundColor: "#ede4d3" }}
        >
          <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="#4d1b6e"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9V3h12v6a6 6 0 0 1-12 0z" />
            <path d="M6 5H3a3 3 0 0 0 3 3M18 5h3a3 3 0 0 1-3 3" />
            <path d="M10 21h4M12 17v4" />
          </svg>
        </div>

        {/* Text */}
        <p className="text-sm md:text-base font-semibold text-white text-center leading-snug">
          Bastion wins Mila Build OS26
        </p>
      </div>
    </motion.div>
  );
}
