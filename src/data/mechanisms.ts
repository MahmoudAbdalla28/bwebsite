// Twelve mechanisms out of the cortex, one per face. Weighted toward what
// actually shows up in agent work rather than model internals. Every one is
// peer-reviewed with a paper behind it, and the line is the non-obvious part.
export const mechanisms = [
  {
    face: 'boundary collapse',
    title: 'There is no instruction/data boundary to violate',
    line: 'Position encodings carry relative order and nothing else. Nothing type-tags a system instruction differently from a retrieved document, so injected text is architecturally indistinguishable from a command. Indirect injection is not a gap in the guardrail, it is the absence of a boundary.',
    cite: 'RoPE, 2104.09864',
    url: 'https://arxiv.org/abs/2104.09864',
  },
  {
    face: 'vector store exfil',
    title: 'Embeddings are reversible, so your vector DB is plaintext',
    line: 'Dense embeddings can be inverted back to their source text by iterative refinement. Read access to a RAG index, a cached embedding table or a leaked vector store reconstructs the private documents behind it. Teams treat embeddings as opaque. They are not.',
    cite: 'vec2text, 2310.06816',
    url: 'https://arxiv.org/pdf/2310.06816',
  },
  {
    face: 'cross-modal injection',
    title: 'The instruction arrives as an image',
    line: 'An imperceptible perturbation in an image or audio clip steers the encoder into emitting the embedding of an attacker instruction string. A vision-capable agent reads a poisoned document and follows text no human can see in it.',
    cite: 'Bagdasaryan et al, 2307.10490',
    url: 'https://arxiv.org/abs/2307.10490',
  },
  {
    face: 'token fragmentation',
    title: 'Your filter and your model read different strings',
    line: 'Homoglyphs, zero-width characters and interleaved emoji tokenise differently from the visually identical ASCII. A classifier keyed on the clean string misses it while the model still reads the word. The filter and the thing it protects disagree on the input.',
    cite: 'Unicode smuggling, 2510.10271',
    url: 'https://arxiv.org/abs/2510.10271',
  },
  {
    face: 'dormant backdoor',
    title: 'Safety training does not remove a backdoor, it hides it',
    line: 'A trigger-conditioned backdoor survives supervised fine-tuning, RLHF and adversarial training. Adversarial training can teach the model to recognise the trigger and conceal the behaviour better. A model that passes your safety audit can still be carrying one.',
    cite: 'Sleeper Agents, 2401.05566',
    url: 'https://arxiv.org/abs/2401.05566',
  },
  {
    face: 'many-shot override',
    title: 'A long enough context beats the safety training',
    line: 'Filling the window with faux dialogues where the assistant complies overrides refusal, and the effect scales with the number of examples. Every increase in context length is also an increase in attack budget.',
    cite: 'Anthropic, many-shot',
    url: 'https://www.anthropic.com/research/many-shot-jailbreaking',
  },
  {
    face: 'safety dilution',
    title: 'Refusal gets thinner the longer the context runs',
    line: 'The safety signal rides on a low-dimensional direction whose expression weakens as the trace grows. Bury the intent under enough benign reasoning and refusal stops firing. Safety is not length-invariant, which nobody tests for.',
    cite: 'CoT-hijacking, 2510.26418',
    url: 'https://arxiv.org/abs/2510.26418',
  },
  {
    face: 'shallow alignment',
    title: 'Safety lives in the first few tokens',
    line: 'Alignment mostly shapes the distribution over a model’s opening tokens. Get past a non-refusing prefix and the rest of the generation inherits compliance, which is why prefill, affirmative-prefix and past-tense framings all work for the same underlying reason.',
    cite: 'Qi et al, 2406.05946',
    url: 'https://arxiv.org/abs/2406.05946',
  },
  {
    face: 'ten examples',
    title: 'Ten examples undo the alignment',
    line: 'Fine-tuning an aligned model on roughly ten adversarial examples removes safety training, for cents. Even benign fine-tuning degrades it. Any fine-tune handle you expose to a customer is a de-alignment vector.',
    cite: 'Qi et al, 2310.03693',
    url: 'https://arxiv.org/abs/2310.03693',
  },
  {
    face: 'attention routing',
    title: 'Attention is content-addressed, so it can be outbid',
    line: 'Information moves between positions by query-key matching, and high-salience or repeated tokens capture attention mass. Injected instructions in retrieved data can simply outrank the real system prompt for routing.',
    cite: 'Induction heads, Anthropic',
    url: 'https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html',
  },
  {
    face: 'competing objectives',
    title: 'Helpfulness and harmlessness are trained to fight',
    line: 'Two failure modes explain almost every jailbreak family: instruction-following competing with safety, and safety generalising worse than capability does. Nearly every technique that works is one or the other wearing a costume.',
    cite: 'Wei et al, 2307.02483',
    url: 'https://arxiv.org/abs/2307.02483',
  },
  {
    face: 'thinking budget',
    title: 'The end-of-thinking token is a control surface',
    line: 'Reasoning runs under a token budget ended by a handoff token. Exhaust it and you have a denial of service invisible to output checks. Force it early and the deliberation is cut before it reaches the safety step it was supposed to perform.',
    cite: 'BadThink',
    url: 'https://arxiv.org/abs/2502.12893',
  },
] as const
