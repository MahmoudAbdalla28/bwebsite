// Static mesh background — three blurred pastel orbs, no motion.
// Animations were the single largest scroll-jank source: blur-3xl on three
// 600-700px elements, repainted every frame as transforms ticked. Dropping
// the motion + reducing blur radius gave back roughly 60fps on mid-range
// machines without any visible difference (orbs at 40-50s loop are perceptually
// static anyway).
export default function SoftMeshBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "#FFFFFF" }}
    >
      <div className="absolute -top-32 -left-40 h-[700px] w-[700px] rounded-full bg-blue-200/35 blur-xl" />
      <div className="absolute top-1/4 -right-32 h-[600px] w-[600px] rounded-full bg-cyan-200/30 blur-xl" />
      <div className="absolute -bottom-32 left-1/3 h-[600px] w-[600px] rounded-full bg-indigo-200/25 blur-xl" />
    </div>
  );
}
