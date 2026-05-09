"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { Graph } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/**
 * Self-contained Knowledge Graph demo — embedded sample triples for the
 * Acme Shopping Assistant fleet. Lets visitors interact with the same
 * structure Bastion produces in production: filter by source, filter by
 * entity type, click any node to see its facts.
 */

const ENTITY_TYPES = [
  "Agent", "Tool", "Policy", "Control", "DataSource",
  "Role", "Client", "Region", "Credential", "Code", "Finding",
] as const;

type EntityType = (typeof ENTITY_TYPES)[number] | "Unknown";

const COLOR_BY_TYPE: Record<string, string> = {
  Agent: "#2563eb",
  Code: "#06b6d4",
  Policy: "#a855f7",
  Control: "#4f46e5",
  Tool: "#16a34a",
  DataSource: "#14b8a6",
  Role: "#f97316",
  Client: "#facc15",
  Region: "#ec4899",
  Credential: "#64748b",
  Finding: "#ef4444",
};

type SourceCategory = "log" | "policy" | "finding" | "uploaded";

const SOURCE_CATEGORIES: SourceCategory[] = ["log", "policy", "finding", "uploaded"];

const SOURCE_RING_COLOR: Record<SourceCategory, string> = {
  log: "#1d4ed8",
  policy: "#f59e0b",
  finding: "#dc2626",
  uploaded: "#10b981",
};

const SOURCE_RING_DASH: Record<SourceCategory, number[]> = {
  log: [],
  policy: [4, 3],
  finding: [1, 2],
  uploaded: [6, 2, 1, 2],
};

const SOURCE_LABEL: Record<SourceCategory, string> = {
  log: "Log / telemetry",
  policy: "Policy / general knowledge",
  finding: "Red finding",
  uploaded: "Uploaded policy",
};

interface Triple {
  h: string;
  r: string;
  t: string;
  source: string;
}

const DEMO_TRIPLES: Triple[] = [
  // Fictional fleet — all generic role names, no real vendor brands
  { h: "Agent:cart-agent", r: "in_fleet", t: "Client:demo-retailer", source: "policy" },
  { h: "Agent:checkout-agent", r: "in_fleet", t: "Client:demo-retailer", source: "policy" },
  { h: "Agent:search-agent", r: "in_fleet", t: "Client:demo-retailer", source: "policy" },
  { h: "Agent:reco-agent", r: "in_fleet", t: "Client:demo-retailer", source: "policy" },
  { h: "Agent:inventory-agent", r: "in_fleet", t: "Client:demo-retailer", source: "policy" },
  { h: "Agent:support-agent", r: "in_fleet", t: "Client:demo-retailer", source: "policy" },

  // Tool usage — generic capability names
  { h: "Agent:cart-agent", r: "uses_tool", t: "Tool:payments-processor", source: "log" },
  { h: "Agent:checkout-agent", r: "uses_tool", t: "Tool:payments-processor", source: "log" },
  { h: "Agent:checkout-agent", r: "uses_tool", t: "Tool:orders-system", source: "log" },
  { h: "Agent:search-agent", r: "uses_tool", t: "Tool:search-index", source: "log" },
  { h: "Agent:reco-agent", r: "uses_tool", t: "Tool:session-cache", source: "log" },
  { h: "Agent:reco-agent", r: "uses_tool", t: "Tool:search-index", source: "log" },
  { h: "Agent:inventory-agent", r: "uses_tool", t: "Tool:inventory-system", source: "log" },
  { h: "Agent:support-agent", r: "uses_tool", t: "Tool:ticket-system", source: "log" },

  // Data flow
  { h: "Tool:payments-processor", r: "reads_from", t: "DataSource:payments-db", source: "log" },
  { h: "Tool:orders-system", r: "reads_from", t: "DataSource:orders-db", source: "log" },
  { h: "Tool:ticket-system", r: "reads_from", t: "DataSource:customer-db", source: "log" },
  { h: "Tool:inventory-system", r: "reads_from", t: "DataSource:inventory-db", source: "log" },
  { h: "Agent:reco-agent", r: "reads_from", t: "DataSource:behavior-events", source: "log" },

  // Policies (uploaded by customer)
  { h: "Policy:pii-handling", r: "governs", t: "DataSource:customer-db", source: "uploaded" },
  { h: "Policy:pci-dss", r: "governs", t: "Tool:payments-processor", source: "uploaded" },
  { h: "Policy:scope-boundary", r: "restricts", t: "Agent:checkout-agent", source: "uploaded" },
  { h: "Policy:scope-boundary", r: "restricts", t: "Agent:support-agent", source: "uploaded" },

  // Policies (general regulatory knowledge)
  { h: "Policy:gdpr", r: "governs", t: "Region:eu-west", source: "policy" },
  { h: "Policy:nist-ai-rmf", r: "applies_to", t: "Client:demo-retailer", source: "policy" },

  // Controls
  { h: "Control:rate-limit", r: "enforced_on", t: "Tool:payments-processor", source: "policy" },
  { h: "Control:audit-log", r: "observes", t: "Agent:checkout-agent", source: "policy" },
  { h: "Control:tool-allowlist", r: "derived_from", t: "Policy:scope-boundary", source: "policy" },
  { h: "Control:pii-redaction", r: "derived_from", t: "Policy:pii-handling", source: "policy" },

  // Roles & supervision
  { h: "Role:platform-admin", r: "supervises", t: "Agent:checkout-agent", source: "policy" },
  { h: "Role:risk-officer", r: "reviews", t: "Policy:pci-dss", source: "policy" },
  { h: "Role:customer", r: "interacts_with", t: "Agent:cart-agent", source: "log" },
  { h: "Role:customer", r: "interacts_with", t: "Agent:support-agent", source: "log" },

  // Geography
  { h: "Client:demo-retailer", r: "serves", t: "Region:us-east", source: "policy" },
  { h: "Client:demo-retailer", r: "serves", t: "Region:eu-west", source: "policy" },
  { h: "Region:eu-west", r: "requires", t: "Policy:gdpr", source: "policy" },

  // Credentials & agent-scoped codes
  { h: "Credential:payments-key", r: "authorizes", t: "Tool:payments-processor", source: "log" },
  { h: "Credential:search-token", r: "authorizes", t: "Tool:search-index", source: "log" },
  { h: "Code:agent-checkout-001", r: "scoped_to", t: "Agent:checkout-agent", source: "log" },
  { h: "Code:agent-cart-001", r: "scoped_to", t: "Agent:cart-agent", source: "log" },
  { h: "Code:agent-support-001", r: "scoped_to", t: "Agent:support-agent", source: "log" },

  // Red findings
  { h: "Finding:scope-violation-001", r: "against", t: "Agent:support-agent", source: "finding" },
  { h: "Finding:scope-violation-001", r: "violates", t: "Policy:scope-boundary", source: "finding" },
  { h: "Finding:tool-chain-007", r: "against", t: "Agent:reco-agent", source: "finding" },
  { h: "Finding:pii-leak-002", r: "against", t: "Agent:support-agent", source: "finding" },
  { h: "Finding:pii-leak-002", r: "violates", t: "Policy:pii-handling", source: "finding" },
];

// Hover descriptions — what each entity DOES, not what was observed.
const ENTITY_DESCRIPTION: Record<string, string> = {
  // Agents
  "Agent:cart-agent": "Adds and removes items from a customer's shopping cart.",
  "Agent:checkout-agent": "Completes purchases and processes payment for a customer.",
  "Agent:search-agent": "Finds products in the catalogue matching a customer's query.",
  "Agent:reco-agent": "Suggests products based on browsing and purchase history.",
  "Agent:inventory-agent": "Tracks stock levels across the catalogue.",
  "Agent:support-agent": "Answers customer questions and resolves support requests.",
  // Tools
  "Tool:payments-processor": "Charges and refunds customer payment methods.",
  "Tool:orders-system": "Reads and writes order records.",
  "Tool:inventory-system": "Reads and writes stock-level data.",
  "Tool:search-index": "Full-text search over the product catalogue.",
  "Tool:session-cache": "Low-latency store for per-session state.",
  "Tool:ticket-system": "Tracks customer support requests and resolutions.",
  // DataSources
  "DataSource:payments-db": "Stores tokenised card and transaction records.",
  "DataSource:orders-db": "Stores order records and shipping data.",
  "DataSource:customer-db": "Stores customer profiles and personal data.",
  "DataSource:inventory-db": "Stores stock levels and SKU metadata.",
  "DataSource:behavior-events": "Stores customer browsing and click events.",
  // Policies
  "Policy:pii-handling": "Rules for collecting, storing, and disclosing personal data.",
  "Policy:pci-dss": "Card-industry security standard for payment handling.",
  "Policy:scope-boundary": "Defines what each agent is allowed to do.",
  "Policy:gdpr": "EU regulation governing personal-data processing.",
  "Policy:nist-ai-rmf": "Voluntary framework for managing AI risk.",
  // Controls
  "Control:rate-limit": "Caps the number of calls per second to a tool.",
  "Control:audit-log": "Records every agent action for later review.",
  "Control:tool-allowlist": "Defines the set of tools each agent can call.",
  "Control:pii-redaction": "Strips personal data from logs and outputs.",
  // Roles
  "Role:platform-admin": "Configures and supervises agents in production.",
  "Role:risk-officer": "Reviews policies and approves coverage decisions.",
  "Role:customer": "End user interacting with the assistant.",
  // Clients
  "Client:demo-retailer": "Fictional customer used to illustrate the fleet.",
  // Regions
  "Region:us-east": "United States deployment region.",
  "Region:eu-west": "European deployment region.",
  // Credentials
  "Credential:payments-key": "Authorises calls to the payments processor.",
  "Credential:search-token": "Authorises reads from the search index.",
  // Codes
  "Code:agent-checkout-001": "Per-agent secret scoped to the checkout agent.",
  "Code:agent-cart-001": "Per-agent secret scoped to the cart agent.",
  "Code:agent-support-001": "Per-agent secret scoped to the support agent.",
  // Findings
  "Finding:scope-violation-001": "An agent attempted an action outside its boundary.",
  "Finding:tool-chain-007": "Detected an unauthorised composition of tool calls.",
  "Finding:pii-leak-002": "Personal data was detected in an agent's output.",
};

function entityType(name: string): EntityType {
  const colon = String(name || "").indexOf(":");
  return (colon > 0 ? (name.slice(0, colon) as EntityType) : "Unknown");
}

function entityLabel(name: string): string {
  const colon = String(name || "").indexOf(":");
  return colon > 0 ? name.slice(colon + 1) : String(name || "");
}

function tripleSourceCategory(t: Triple): SourceCategory {
  const s = String(t.source || "");
  if (s.startsWith("probe-finding") || s === "finding") return "finding";
  if (s.startsWith("log")) return "log";
  if (s.startsWith("policy-upload") || s.startsWith("upload") || s === "uploaded")
    return "uploaded";
  return "policy";
}

interface GraphNode {
  id: string;
  type: EntityType;
  label: string;
  sources: Set<SourceCategory>;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relation: string;
  sourceCategory: SourceCategory;
}

function buildGraph(
  triples: Triple[],
  filterTypes: Set<EntityType>,
  filterSources: Set<SourceCategory>,
): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodeMap = new Map<string, GraphNode>();
  const links: GraphLink[] = [];
  for (const t of triples) {
    const ht = entityType(t.h);
    const tt = entityType(t.t);
    const src = tripleSourceCategory(t);
    if (filterTypes.size > 0) {
      if (!filterTypes.has(ht) && !filterTypes.has(tt)) continue;
    }
    if (filterSources.size > 0) {
      if (!filterSources.has(src)) continue;
    }
    if (!nodeMap.has(t.h))
      nodeMap.set(t.h, { id: t.h, type: ht, label: entityLabel(t.h), sources: new Set() });
    if (!nodeMap.has(t.t))
      nodeMap.set(t.t, { id: t.t, type: tt, label: entityLabel(t.t), sources: new Set() });
    nodeMap.get(t.h)!.sources.add(src);
    nodeMap.get(t.t)!.sources.add(src);
    links.push({ source: t.h, target: t.t, relation: t.r, sourceCategory: src });
  }
  return { nodes: Array.from(nodeMap.values()), links };
}

const SourceGlyph = ({ source }: { source: SourceCategory }) => {
  const stroke = SOURCE_RING_COLOR[source] || "#64748b";
  const dash = (SOURCE_RING_DASH[source] || []).join(" ");
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" className="shrink-0">
      <line
        x1="1"
        y1="5"
        x2="17"
        y2="5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray={dash || "none"}
      />
    </svg>
  );
};

export default function KnowledgeGraphDemo() {
  const triples = DEMO_TRIPLES;
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filterTypes, setFilterTypes] = useState<Set<EntityType>>(new Set());
  const [filterSources, setFilterSources] = useState<Set<SourceCategory>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);
  const [dims, setDims] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const graph = useMemo(
    () => buildGraph(triples, filterTypes, filterSources),
    [triples, filterTypes, filterSources],
  );

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    const charge = fg.d3Force?.("charge") as { strength: (n: number) => unknown } | undefined;
    const link = fg.d3Force?.("link") as { distance: (n: number) => unknown } | undefined;
    if (charge?.strength) charge.strength(-160);
    if (link?.distance) link.distance(60);
    if (typeof fg.d3ReheatSimulation === "function") fg.d3ReheatSimulation();
  }, [graph]);

  const detailTriples = useMemo(() => {
    if (!selectedNode) return [];
    return triples.filter((t) => t.h === selectedNode.id || t.t === selectedNode.id);
  }, [triples, selectedNode]);

  const sourcesInData = useMemo(() => {
    const seen = new Set<SourceCategory>();
    for (const t of triples) seen.add(tripleSourceCategory(t));
    return SOURCE_CATEGORIES.filter((s) => seen.has(s));
  }, [triples]);

  const typesInData = useMemo(() => {
    const seen = new Set<EntityType>();
    for (const t of triples) {
      seen.add(entityType(t.h));
      seen.add(entityType(t.t));
    }
    return ENTITY_TYPES.filter((t) => seen.has(t));
  }, [triples]);

  const toggleSource = (source: SourceCategory) => {
    setFilterSources((prev) => {
      const next = new Set(prev);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      return next;
    });
  };

  const toggleType = (type: EntityType) => {
    setFilterTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div className="w-full h-[640px] flex flex-col overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/15 bg-white border border-slate-200">
      {/* macOS-style window chrome — traffic lights left, title centred */}
      <div className="h-10 bg-[#2d2d3a] flex items-center px-4 shrink-0 relative">
        <div className="flex gap-2">
          <div
            className="w-3 h-3 rounded-full bg-[#FF3B30] hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full bg-[#FFD60A] hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-hidden="true"
          />
          <div
            className="w-3 h-3 rounded-full bg-[#32D74B] hover:scale-110 active:scale-95 transition-transform duration-200"
            aria-hidden="true"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] font-mono text-slate-300 tracking-wide">
          <Graph size={13} weight="bold" />
          <span>policy-knowledge-graph · {triples.length} facts</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="shrink-0 border-b border-slate-200 px-6 md:px-8 py-3 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2">
            Filter by source:
          </span>
          {sourcesInData.map((source) => {
            const active = filterSources.has(source);
            return (
              <button
                key={source}
                onClick={() => toggleSource(source)}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest px-3 py-1 border transition-colors cursor-pointer flex items-center gap-2",
                  active
                    ? "border-slate-700 text-slate-900 bg-slate-100"
                    : "border-slate-200 text-slate-600 hover:border-slate-400",
                )}
              >
                <SourceGlyph source={source} />
                {SOURCE_LABEL[source]}
              </button>
            );
          })}
          {filterSources.size > 0 && (
            <button
              onClick={() => setFilterSources(new Set())}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-800 underline ml-2 cursor-pointer"
            >
              clear
            </button>
          )}
          <span className="ml-auto text-[10px] font-mono text-slate-400 hidden md:inline">
            ring = source · fill = entity type
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2">
            Filter by category:
          </span>
          {typesInData.map((type) => {
            const active = filterTypes.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest px-3 py-1 border transition-colors cursor-pointer",
                  active
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-slate-200 text-slate-600 hover:border-slate-400",
                )}
                style={
                  active
                    ? undefined
                    : { boxShadow: `inset 4px 0 0 ${COLOR_BY_TYPE[type] || "#94a3b8"}` }
                }
              >
                {type}
              </button>
            );
          })}
          {filterTypes.size > 0 && (
            <button
              onClick={() => setFilterTypes(new Set())}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-800 underline ml-2 cursor-pointer"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {/* Graph + sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <div ref={containerRef} className="flex-1 bg-slate-50 relative overflow-hidden">
          {graph.nodes.length > 0 && (
            <ForceGraph2D
              ref={fgRef}
              graphData={graph}
              width={dims.w}
              height={dims.h}
              nodeLabel={(n: GraphNode) => {
                const desc = ENTITY_DESCRIPTION[n.id] || "";
                return `${n.type}: ${n.label}${desc ? `\n${desc}` : ""}`;
              }}
              nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D) => {
                const r = 6;
                const fill = COLOR_BY_TYPE[node.type] || "#94a3b8";
                const sources = Array.from(node.sources || []);
                ctx.beginPath();
                ctx.fillStyle = fill;
                ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.lineWidth = 1.5;
                sources.forEach((s, i) => {
                  const ringR = r + 2 + i * 2.5;
                  ctx.beginPath();
                  ctx.strokeStyle = SOURCE_RING_COLOR[s] || "#94a3b8";
                  ctx.setLineDash(SOURCE_RING_DASH[s] || []);
                  ctx.arc(node.x!, node.y!, ringR, 0, 2 * Math.PI);
                  ctx.stroke();
                });
                ctx.setLineDash([]);
              }}
              nodePointerAreaPaint={(node: GraphNode, color: string, ctx: CanvasRenderingContext2D) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.x!, node.y!, 9, 0, 2 * Math.PI);
                ctx.fill();
              }}
              linkLabel={(l: GraphLink) => l.relation}
              linkColor={() => "rgba(100, 116, 139, 0.4)"}
              linkDirectionalArrowLength={4}
              linkDirectionalArrowRelPos={0.92}
              cooldownTicks={120}
              onNodeClick={(node: GraphNode) => setSelectedNode(node)}
              backgroundColor="rgba(0,0,0,0)"
            />
          )}
        </div>

        <aside className="w-72 lg:w-80 shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
          {selectedNode ? (
            <div className="p-5 space-y-4">
              <header>
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: COLOR_BY_TYPE[selectedNode.type] || "#94a3b8" }}
                >
                  {selectedNode.type}
                </div>
                <h2 className="text-base font-bold text-slate-900 font-mono break-all">
                  {selectedNode.label}
                </h2>
                {selectedNode.sources.size > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Source:
                    </span>
                    {Array.from(selectedNode.sources).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-1.5 py-0.5 border border-slate-300 text-slate-700 flex items-center gap-1.5"
                      >
                        <SourceGlyph source={s} />
                        {SOURCE_LABEL[s]}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Facts about this item
                </h3>
                <ul className="space-y-2">
                  {detailTriples.map((t, idx) => {
                    const src = tripleSourceCategory(t);
                    return (
                      <li
                        key={idx}
                        className="text-xs font-mono bg-slate-50 border border-slate-200 border-l-2 border-l-slate-400 p-2"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <SourceGlyph source={src} />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-700">
                            {SOURCE_LABEL[src]}
                          </span>
                        </div>
                        <div className="text-slate-600 break-all">{t.h}</div>
                        <div className="text-blue-600 my-0.5">— {t.r} —</div>
                        <div className="text-slate-600 break-all">{t.t}</div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          ) : (
            <div className="p-5 space-y-3 text-sm text-slate-500">
              <p className="font-bold text-slate-700">Click a node to see its facts.</p>
              <p>
                The <strong className="text-slate-700">ring</strong> shows where the fact came from
                — solid blue for log/telemetry, dashed amber for policy, dotted red for Red findings,
                dash-dot emerald for uploaded policy docs. The{" "}
                <strong className="text-slate-700">fill</strong> shows the entity type.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
