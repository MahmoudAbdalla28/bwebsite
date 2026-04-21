"use client";

import { motion } from "framer-motion";

const integrations: { name: string; logo: string; wordmark: boolean }[] = [
  { name: "OpenAI", logo: "/bastion/assets/logos/openai.svg", wordmark: false },
  { name: "Anthropic", logo: "/bastion/assets/logos/anthropic.svg", wordmark: false },
  { name: "AWS", logo: "/bastion/assets/logos/aws.svg", wordmark: true },
  { name: "Google Cloud", logo: "/bastion/assets/logos/google-cloud.svg", wordmark: true },
  { name: "Azure", logo: "/bastion/assets/logos/azure.svg", wordmark: false },
  { name: "Ollama", logo: "/bastion/assets/logos/ollama.svg", wordmark: false },
  { name: "CrowdStrike", logo: "/bastion/assets/logos/crowdstrike.svg", wordmark: true },
  { name: "Splunk", logo: "/bastion/assets/logos/splunk.svg", wordmark: false },
  { name: "Datadog", logo: "/bastion/assets/logos/datadog.svg", wordmark: false },
  { name: "Elastic", logo: "/bastion/assets/logos/elastic.svg", wordmark: false },
  { name: "Microsoft Sentinel", logo: "/bastion/assets/logos/microsoft.svg", wordmark: false },
  { name: "Netskope", logo: "/bastion/assets/logos/netskope.svg", wordmark: true },
  { name: "Zscaler", logo: "/bastion/assets/logos/zscaler.svg", wordmark: true },
  { name: "Palo Alto", logo: "/bastion/assets/logos/paloalto.svg", wordmark: false },
  { name: "SentinelOne", logo: "/bastion/assets/logos/sentinelone.svg", wordmark: true },
  { name: "Bitdefender", logo: "/bastion/assets/logos/bitdefender.svg", wordmark: false },
  { name: "LiteLLM", logo: "/bastion/assets/logos/litellm.svg", wordmark: false },
];

const doubled = [...integrations, ...integrations];

export default function IntegrationsCarousel() {
  return (
    <section className="pt-20 pb-10 md:pt-28 md:pb-12 bg-white border-t border-border-light">
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
          className="flex gap-10 items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { duration: 45, repeat: Infinity, ease: "linear" },
          }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="shrink-0 flex flex-col items-center gap-2 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt={item.name}
                className={`w-auto grayscale opacity-50 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300 ${
                  item.wordmark ? "h-7" : "h-8"
                }`}
              />
              {!item.wordmark && (
                <span className="text-[11px] font-medium text-text-dim/60 group-hover:text-text-dim transition-colors duration-300 whitespace-nowrap">
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
