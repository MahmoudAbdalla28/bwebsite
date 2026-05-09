import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const metrics = [
  { metric: "Operational Latency", impact: "80 ms across 6 enforcement layers (10-agent baseline)" },
  { metric: "Exclusion Mitigation", impact: "42 governance policies converted to technical rules" },
  { metric: "Agentic Drift Intercepted", impact: "14 instances of unauthorized actions blocked and contained" },
];

export default function MebaCaseStudyPage() {
  return (
    <>
      <Navbar />

      <main className="bg-bg pt-32 pb-24 md:pt-40 md:pb-32">
        <article className="mx-auto max-w-5xl px-6">
          {/* Back link */}
          <a
            href="/bastion/case-studies/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-dim hover:text-primary transition-colors"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
              <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to case studies
          </a>

          {/* Title */}
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text leading-[1.05]">
            Solving the AI Coverage Cliff in Industrial Production
          </h1>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 bg-blue-50/80 border border-blue-100 px-3.5 py-1.5 rounded-full">
              MEBA · Advanced Manufacturing
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 bg-blue-50/80 border border-blue-100 px-3.5 py-1.5 rounded-full">
              Industrial AI / Insurtech
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 bg-blue-50/80 border border-blue-100 px-3.5 py-1.5 rounded-full">
              CGL Continuity &amp; Governance
            </span>
          </div>
          <p className="mt-4 text-xs font-mono uppercase tracking-[0.18em] text-gray-600">
            Implementation done by Piston Solutions
          </p>

          {/* Lead / Executive Summary */}
          <div className="mt-10 max-w-4xl space-y-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-gray-900 font-semibold">
              Executive Summary: Securing the Agentic Frontier
            </p>
            <p className="text-xl leading-relaxed text-text-secondary">
              As MEBA moved toward an AI-augmented production model, they hit a &ldquo;coverage cliff.&rdquo; New ISO exclusions (CG 40 47 and CG 40 48) threatened to void their Commercial General Liability (CGL) policy for any agentic error. The black-box nature of autonomous machine agency created an uninsurable risk profile for their Managing General Agent.
            </p>
            <p className="text-xl leading-relaxed text-text-secondary">
              Bastion served as the governance layer that bridged this gap, providing the real-time technical underwriting data required to prove that every agentic action is monitored, secured, and provably aligned with the controls mandated by their carriers.
            </p>
          </div>

          {/* Body sections */}
          <div className="mt-14 space-y-12">
            <section>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
                I. The Challenge: The Uninsurable Agent
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-text-secondary max-w-4xl">
                <p>
                  MEBA achieved unprecedented visibility into its foundry and machine shop through autonomous agents. However, this digital leap introduced a critical governance vacuum. Leadership faced a fundamental trust gap, with primary concerns centered on <strong className="text-text font-semibold">agentic drift</strong>: unauthorized machine commands operating outside their intended scope.
                </p>
                <p>
                  These concerns were echoed by their insurance coverage. Under the new ISO standards, standard CGL policies often exclude bodily injury or property damage arising from AI outputs. MEBA faced a structural dilemma: without technical guardrails, they lacked the &ldquo;Evidence of Control&rdquo; required to prevent a total loss of liability protection. The efficiency of AI was being offset by a catastrophic risk to their insurance standing.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
                II. The Solution: The Technical Underwriting Layer
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-text-secondary max-w-4xl">
                <p>
                  Bastion acted as a permanent security perimeter, converting &ldquo;legal&rdquo; policy into &ldquo;code&rdquo; enforcement.
                </p>
                <p>
                  <strong className="text-text font-semibold">Runtime Enforcement:</strong> Bastion provided the source of truth required by underwriters. By baselining agent intent, MEBA demonstrated to their insurer that no agent could deviate from safe operating parameters.
                </p>
                <p>
                  <strong className="text-text font-semibold">Knowledge Graph Governance:</strong> MEBA&apos;s proprietary safety manuals and operational policies were ingested into a Knowledge Graph. This mathematically blocked agents from executing any command that violated the allow-list associated with furnace and CNC operations.
                </p>
                <p>
                  <strong className="text-text font-semibold">Continuous Assessment:</strong> Adversarial testing preemptively closed security loops, providing the stress-test documentation the MGA needed to move from uncertainty to affirmative coverage.
                </p>
              </div>
            </section>

            {/* Image 1: Knowledge Graph */}
            <figure className="overflow-hidden rounded-sm border border-border bg-bg-alt shadow-lg shadow-primary/5 lg:-mx-12 xl:-mx-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bastion/assets/case-studies/meba-knowledge-graph-v2.png"
                alt="Bastion policy vault knowledge graph governing MEBA agent operations"
                className="w-full"
              />
              <figcaption className="px-6 py-4 text-sm text-text-dim border-t border-border bg-white">
                Knowledge Graph Governance: MEBA&apos;s safety manuals and operational policies indexed as enforced rules across 55 triples.
              </figcaption>
            </figure>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
                III. Operational Impact &amp; Insurance Telemetry
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-text-secondary max-w-4xl">
                <p>
                  Over a 30-day window involving 10 active agents, Bastion produced structured technical underwriting data, replacing underwriting ambiguity with measurable visibility.
                </p>
              </div>

              {/* Metrics table */}
              <div className="mt-8 overflow-hidden rounded-sm border border-border bg-white">
                <div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-bg-alt text-[11px] font-mono uppercase tracking-widest text-text-dim">
                  <div className="col-span-5">Metric</div>
                  <div className="col-span-7">Measured Impact</div>
                </div>
                {metrics.map((row) => (
                  <div
                    key={row.metric}
                    className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-border last:border-b-0 hover:bg-bg-alt/50 transition-colors"
                  >
                    <p className="col-span-5 text-base font-semibold text-text">{row.metric}</p>
                    <p className="col-span-7 text-base text-text-secondary leading-relaxed">{row.impact}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 max-w-4xl">
                <p className="text-lg leading-relaxed text-text-secondary">
                  This telemetry was structured to align with the transparency standards of global energy partners, supporting MEBA&apos;s evidence base for <strong className="text-text font-semibold">SACS-002</strong> and <strong className="text-text font-semibold">ISO 27001</strong> reviews.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
                IV. Outcome: Affirmative AI Coverage
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-text-secondary max-w-4xl">
                <p>
                  MEBA solved the fundamental paradox of industrial AI: maintaining high-velocity automation while staying strictly within the boundaries of their CGL policy.
                </p>
                <p>
                  By using Bastion to decouple agency from risk, MEBA&apos;s insurer agreed to issue an <strong className="text-text font-semibold">affirmative AI endorsement</strong>, effectively buying back the exclusions that would have otherwise left the firm exposed. As MEBA scales toward fuller Industry 4.0 integration, every new agent added to the fleet inherits this hardened governance.
                </p>
                <p>
                  Bastion ensures that as the digital workforce grows, the insurance value increases while the management overhead stays at zero.
                </p>
              </div>
            </section>
          </div>

          {/* Closing CTA */}
          <div className="mt-16 pt-10 border-t border-border max-w-4xl">
            <p className="text-base leading-relaxed text-text-secondary">
              Facing AI exclusions in your CGL renewal? Bastion provides the technical underwriting layer that converts agentic risk into structured, measurable evidence. The kind that turns &ldquo;uninsurable&rdquo; into &ldquo;affirmatively covered.&rdquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              MEBA engagement implemented by <strong className="text-text font-semibold">Piston Solutions</strong>, with deep experience deploying industrial AI infrastructure across Tier 1 supply chains.
            </p>
            <a
              href="/bastion/contact/"
              className="btn-glow mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
            >
              Request a briefing
              <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none">
                <path d="M0 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
