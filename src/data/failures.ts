// Real, publicly reported AI failures. Every line here must be checkable.
// No entry goes in without a source that names the incident.
// Synopsis style: lowercase, no closing punctuation, one clause.
export const failures = [
  {
    who: 'meta ai',
    what: 'guessable prompt ids let one user read another user’s chats',
    when: 'jul 2025',
    href: 'https://www.malwarebytes.com/blog/news/2025/07/meta-ai-chatbot-bug-could-have-allowed-anyone-to-see-private-conversations',
    source: 'malwarebytes',
  },
  {
    who: 'cursor',
    what: 'a poisoned workspace turned allowlisted git commands into arbitrary execution',
    when: 'cve-2026-22708',
    href: 'https://nvd.nist.gov/vuln/detail/CVE-2026-22708',
    source: 'nvd',
  },
  {
    who: 'nine mexican government agencies',
    what: 'an operator drove coding agents through 305 internal servers',
    when: 'feb 2026',
    href: 'https://research.checkpoint.com/',
    source: 'check point research',
  },
] as const

// NOT INCLUDED, and why:
//   "meta ai 20k accounts breach" — could not find a 20k-account Meta AI
//   breach. The verifiable Meta AI incident is the prompt-id authorization
//   bug above (Sandeep Hodkasia, $10k bounty, found Dec 2024, fixed Jan 2025).
//   If the 20k figure is real, send the source and it goes in.
