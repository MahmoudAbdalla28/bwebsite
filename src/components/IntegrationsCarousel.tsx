"use client";

type Category = "llm" | "siem" | "security";

type Integration = { name: string; logo: string; wordmark: boolean; category: Category };

const integrations: Integration[] = [
  // LLM providers
  { name: "OpenAI", logo: "/bastion/assets/logos/openai.svg", wordmark: false, category: "llm" },
  { name: "Anthropic", logo: "/bastion/assets/logos/anthropic.svg", wordmark: false, category: "llm" },
  { name: "AWS Bedrock", logo: "/bastion/assets/logos/aws.svg", wordmark: true, category: "llm" },
  { name: "Google Vertex AI", logo: "/bastion/assets/logos/google-cloud.svg", wordmark: true, category: "llm" },
  { name: "Azure OpenAI", logo: "/bastion/assets/logos/azure.svg", wordmark: false, category: "llm" },
  { name: "Ollama", logo: "/bastion/assets/logos/ollama.svg", wordmark: false, category: "llm" },
  { name: "LiteLLM", logo: "/bastion/assets/logos/litellm.svg", wordmark: false, category: "llm" },

  // SIEM / observability
  { name: "Splunk", logo: "/bastion/assets/logos/splunk.svg", wordmark: false, category: "siem" },
  { name: "Datadog", logo: "/bastion/assets/logos/datadog.svg", wordmark: false, category: "siem" },
  { name: "Elastic", logo: "/bastion/assets/logos/elastic.svg", wordmark: false, category: "siem" },
  { name: "Microsoft Sentinel", logo: "/bastion/assets/logos/microsoft.svg", wordmark: false, category: "siem" },

  // Endpoint security / CASB
  { name: "CrowdStrike", logo: "/bastion/assets/logos/crowdstrike.svg", wordmark: true, category: "security" },
  { name: "Netskope", logo: "/bastion/assets/logos/netskope.svg", wordmark: true, category: "security" },
  { name: "Zscaler", logo: "/bastion/assets/logos/zscaler.svg", wordmark: true, category: "security" },
  { name: "Palo Alto", logo: "/bastion/assets/logos/paloalto.svg", wordmark: false, category: "security" },
  { name: "SentinelOne", logo: "/bastion/assets/logos/sentinelone.svg", wordmark: true, category: "security" },
  { name: "Bitdefender", logo: "/bastion/assets/logos/bitdefender.svg", wordmark: false, category: "security" },
];

const copy: Record<Category, { label: string; title: string; body: string }> = {
  llm: {
    label: "LLM Compatibility",
    title: "Works with every model provider",
    body: "Point your agents at any major provider. Bastion sits in between, framework-agnostic, no SDK changes required.",
  },
  siem: {
    label: "Telemetry Pipeline",
    title: "Exports into your observability stack",
    body: "Structured telemetry streams directly into your existing SIEM. Bastion writes into the tools your security team already runs.",
  },
  security: {
    label: "Security Stack",
    title: "Sits alongside your existing controls",
    body: "Endpoint security, CASB, and network controls stay in place. Bastion adds the AI-specific layer they don't cover.",
  },
};

function LogoItem({ item }: { item: Integration }) {
  return (
    <div className="shrink-0 flex flex-col items-center gap-2 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.logo}
        alt={item.name}
        className={`w-auto grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-300 ${
          item.wordmark ? "h-7" : "h-8"
        }`}
      />
      {!item.wordmark && (
        <span className="text-[11px] font-medium text-text-dim/70 group-hover:text-text-dim transition-colors duration-300 whitespace-nowrap">
          {item.name}
        </span>
      )}
    </div>
  );
}

export default function IntegrationsCarousel({ category = "llm" }: { category?: Category }) {
  const filtered = integrations.filter((i) => i.category === category);
  const c = copy[category];

  return (
    <section className="pt-20 pb-8 md:pt-24 md:pb-10 bg-white border-t border-border-light">
      <div className="mx-auto max-w-5xl px-6 mb-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary mb-4">{c.label}</p>
        <h3 className="text-2xl font-bold text-text sm:text-3xl">
          {c.title}
        </h3>
        <p className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-text-muted">
          {c.body}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-6 max-w-5xl mx-auto">
        {filtered.map((item) => (
          <LogoItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
