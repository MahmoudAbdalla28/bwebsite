// Technique families in the corpus, with real depth counts.
// Source: the cortex snapshot the product ships (`public/cortex/_families.json`
// in the app repo). Snapshot 2026-07-30.
//
// Filtered: anything naming a target, platform or engagement is excluded.
// These are generic failure classes only, which is what hard rule 3 requires.
export const families = [
  { label: 'Prompt injection', count: 75 },
  { label: 'Auth bypass', count: 58 },
  { label: 'Objective competition', count: 55 },
  { label: 'Jailbreak', count: 41 },
  { label: 'Remote code execution', count: 41 },
  { label: 'Framework and infra CVE', count: 38 },
  { label: 'Agent-runtime exfiltration', count: 33 },
  { label: 'MCP and tool-layer attack', count: 31 },
  { label: 'Server-side request forgery', count: 30 },
  { label: 'Information disclosure', count: 26 },
] as const

export const familyMax = 75
