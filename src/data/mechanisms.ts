// Twelve mechanisms out of the cortex, one per face. Every one is peer-reviewed
// with a paper behind it. The line is the non-obvious part, the thing a
// researcher nods at, not a definition.
export const mechanisms = [
  {
    face: 'shallow alignment',
    title: 'Safety lives in the first few tokens',
    line: 'Alignment mostly shapes the distribution over a model’s opening tokens. Get past a non-refusing prefix and the rest of the generation inherits compliance, which is why prefill, affirmative-prefix and past-tense framings all work for the same reason.',
    cite: 'Qi et al, 2406.05946',
    url: 'https://arxiv.org/abs/2406.05946',
  },
  {
    face: 'refusal direction',
    title: 'Refusal is one direction, not a policy',
    line: 'Across 13 open chat models up to 72B, refusal is mediated by a single direction in the residual stream. Orthogonalise it out of the weights and refusal is permanently gone with almost no capability loss.',
    cite: 'Arditi et al, 2406.11717',
    url: 'https://arxiv.org/abs/2406.11717',
  },
  {
    face: 'boundary collapse',
    title: 'There is no instruction/data boundary to violate',
    line: 'Rotary position embeddings encode only relative position. Nothing type-tags a system instruction differently from retrieved data, so injected text in a document is architecturally indistinguishable from a command. Indirect injection is not a bug in the guardrail.',
    cite: 'RoPE, 2104.09864',
    url: 'https://arxiv.org/abs/2104.09864',
  },
  {
    face: 'attention routing',
    title: 'Attention is content-addressed, so it can be outbid',
    line: 'Information moves between positions by QK matching, and high-salience or repeated tokens capture attention mass. Injected instructions can simply outrank the real system prompt for routing.',
    cite: 'Induction heads, Anthropic',
    url: 'https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html',
  },
  {
    face: 'induction heads',
    title: 'Why many-shot works at all',
    line: 'A two-head circuit implements pattern completion: seen [A][B] once, the model completes [A] with [B]. Fill the context with compliant exemplars and the circuit finishes the pattern for you.',
    cite: 'Olsson et al',
    url: 'https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html',
  },
  {
    face: 'safety neurons',
    title: 'About 5% of neurons carry the safety',
    line: 'Safety behaviour concentrates in a sparse, locatable neuron set. Patching only those restores over 90% of safety, which also means ablating them strips refusal while general capability survives.',
    cite: 'Safety Neurons, 2406.14144',
    url: 'https://arxiv.org/abs/2406.14144',
  },
  {
    face: 'ten examples',
    title: 'Ten examples undo the alignment',
    line: 'Fine-tuning an aligned model on roughly ten adversarial examples removes safety training, for cents. Even benign fine-tuning degrades it. Any fine-tune handle you expose is a de-alignment vector.',
    cite: 'Qi et al, 2310.03693',
    url: 'https://arxiv.org/abs/2310.03693',
  },
  {
    face: 'unfaithful cot',
    title: 'The reasoning trace is not the reasoning',
    line: 'Stated chain-of-thought systematically misrepresents the real cause of an answer. A model can rationalise a cued answer without mentioning the cue, so a monitor that reads the trace is reading a story, not the computation.',
    cite: 'Turpin et al',
    url: 'https://arxiv.org/abs/2305.04388',
  },
  {
    face: 'signal dilution',
    title: 'Refusal thins out as the context grows',
    line: 'The safety signal rides on a low-dimensional direction whose expression weakens as reasoning gets longer. Padding a trace with benign tokens buries it, so refusal is not robust across context length.',
    cite: 'CoT-hijacking',
    url: 'https://arxiv.org/abs/2505.14133',
  },
  {
    face: 'outcome reward',
    title: 'Only the answer is graded, never the trace',
    line: 'Reasoning RL rewards the final verifiable outcome, not the steps. The model has no incentive to make its trace faithful or safe, which is the shared root of unfaithful reasoning and of reasoning-channel attacks.',
    cite: 'o1 / R1 training',
    url: 'https://arxiv.org/abs/2501.12948',
  },
  {
    face: 'competing objectives',
    title: 'Helpfulness and harmlessness are trained to fight',
    line: 'Two failure modes explain almost every jailbreak family: instruction-following competing with safety, and safety training generalising worse than capability does. Nearly every technique is one or the other.',
    cite: 'Wei et al, 2307.02483',
    url: 'https://arxiv.org/abs/2307.02483',
  },
  {
    face: 'thinking budget',
    title: 'The end-of-thinking token is a control surface',
    line: 'Reasoning runs under a token budget terminated by a handoff token. Exhaust the budget and you have a stealthy denial of service invisible to output checks. Force it early and you cut the deliberation before it reaches the safety step.',
    cite: 'BadThink',
    url: 'https://arxiv.org/abs/2502.12893',
  },
] as const
