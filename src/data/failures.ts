// Real, publicly reported AI failures. Every line here must be checkable.
// No entry goes in without a source that names the incident.
// Synopsis style: lowercase, no closing punctuation, one clause.
export const failures = [
  {
    who: 'meta ai',
    what: 'guessable prompt ids let one user read another user’s chats',
    klass: 'broken object level authorization',
    code: 'API1',
    when: 'jul 2025',
    href: 'https://www.malwarebytes.com/blog/news/2025/07/meta-ai-chatbot-bug-could-have-allowed-anyone-to-see-private-conversations',
    source: 'malwarebytes',
    detail: 'the server never checked who owned the prompt id',
  },
  {
    who: 'cursor',
    what: 'a poisoned workspace turned allowlisted git commands into arbitrary execution',
    klass: 'tool-layer poisoning',
    code: 'LLM08',
    when: 'cve-2026-22708',
    href: 'https://nvd.nist.gov/vuln/detail/CVE-2026-22708',
    source: 'nvd',
    detail: 'the allowlist was trusted, the environment it ran in was not',
  },
  {
    who: 'mexican government agencies',
    what: 'one operator used a consumer ai to find the holes and pull the data',
    klass: 'agent-driven intrusion',
    code: 'ASI01',
    when: 'dec 2025',
    href: 'https://www.upguard.com/news/sat-data-breach-2026-03-02',
    source: 'upguard',
    detail: '195 million identities out of tax, voter and civil registries',
  },
] as const

// NOT INCLUDED, and why:
//   "meta ai 20k accounts breach" — could not find a 20k-account Meta AI
//   breach. The verifiable Meta AI incident is the prompt-id authorization
//   bug above (Sandeep Hodkasia, $10k bounty, found Dec 2024, fixed Jan 2025).
//   If the 20k figure is real, send the source and it goes in.
//
//   Check Point Research covered this same Mexican incident with bigger
//   numbers (400M records, 305 servers, nine agencies). Their site 403s every
//   automated request, so the URL could not be verified and the link was dead
//   on the page. Cited UpGuard instead, and the copy was rewritten down to
//   what UpGuard actually supports. Never cite a figure to a source that does
//   not carry it.
