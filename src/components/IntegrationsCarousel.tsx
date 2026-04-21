"use client";

import { motion } from "framer-motion";

// type: "wordmark" = logo has the name in it, show logo only
// type: "icon" = logo is a small icon, show text only
const integrations: { name: string; logo: string; type: "wordmark" | "icon" }[] = [
  { name: "OpenAI", logo: "/bastion/assets/logos/openai.svg", type: "icon" },
  { name: "Anthropic", logo: "/bastion/assets/logos/anthropic.svg", type: "icon" },
  { name: "AWS", logo: "/bastion/assets/logos/aws.svg", type: "wordmark" },
  { name: "Google Cloud", logo: "/bastion/assets/logos/google-cloud.svg", type: "wordmark" },
  { name: "Azure", logo: "/bastion/assets/logos/azure.svg", type: "icon" },
  { name: "Ollama", logo: "/bastion/assets/logos/ollama.svg", type: "icon" },
  { name: "CrowdStrike", logo: "/bastion/assets/logos/crowdstrike.svg", type: "wordmark" },
  { name: "Splunk", logo: "/bastion/assets/logos/splunk.svg", type: "icon" },
  { name: "Datadog", logo: "/bastion/assets/logos/datadog.svg", type: "icon" },
  { name: "Elastic", logo: "/bastion/assets/logos/elastic.svg", type: "icon" },
  { name: "Microsoft Sentinel", logo: "/bastion/assets/logos/microsoft.svg", type: "icon" },
  { name: "Netskope", logo: "/bastion/assets/logos/netskope.svg", type: "wordmark" },
  { name: "Zscaler", logo: "/bastion/assets/logos/zscaler.svg", type: "wordmark" },
  { name: "Palo Alto", logo: "/bastion/assets/logos/paloalto.svg", type: "icon" },
  { name: "SentinelOne", logo: "/bastion/assets/logos/sentinelone.svg", type: "wordmark" },
  { name: "Bitdefender", logo: "/bastion/assets/logos/bitdefender.svg", type: "icon" },
];

const doubled = [...integrations, ...integrations];

export default function IntegrationsCarousel() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-border-light">
      <div className="mx-auto max-w-5xl px-6 mb-10">
        <p className="text-sm font-semibold tracking-wide text-primary">Compatibility</p>
        <h3 className="mt-3 text-2xl font-semibold text-text sm:text-3xl">
          Integrates with your stack
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
          LLM providers, SIEM platforms, endpoint security, and CASB systems.
          Bastion sits alongside what you already run.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-14 items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="shrink-0"
            >
              {item.type === "wordmark" ? (
                // Wordmark logos — show logo only, no text
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-7 w-auto grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                // Icon-only logos — show text name
                <span className="text-sm font-semibold text-text-dim/50 hover:text-text-dim transition-colors duration-300 whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
