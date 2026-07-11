import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benchmark · Bastion",
  description:
    "Three red-team tools against four guarded assistants, an adaptive red-team comparison across a four-rung guard ladder.",
};

export default function BenchmarkPage() {
  return (
    <iframe
      src="/benchmark.html"
      title="Bastion red-team benchmark"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
