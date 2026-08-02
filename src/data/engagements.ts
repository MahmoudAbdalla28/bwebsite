// The three most impactful case studies from our own authorized engagements.
// Every entry is a real, confirmed finding pulled from the cortex graph.
// Targets are anonymized to their vertical and agent type; failure patterns
// only, no working payloads, no CVEs, no named companies. This is the
// "not-LARP" section, so nothing goes in that we did not confirm firsthand.
//
// Source engagements (internal, not for the page): 01 GitHub Copilot VRP,
// 02 Cignara/LG CX platform, 03 Shopify Sidekick. Kept here so the mapping is
// auditable. The vertical is the concrete agent type, not an abstract sector.
export const engagements = [
  {
    n: '01',
    vertical: 'Coding agent',
    tag: 'Indirect prompt injection',
    accent: 1,
    title: 'Turned a coding agent’s issue tracker into a command channel',
    body: 'The agent’s tool connector shipped its author-trust filter off by default, so text from a stranger’s pull request and issue comments reached the agent as trusted instructions. Behind every tool call sat one full-scope token with no per-action check, meaning injected text could drive merges, approvals and secret reads with no human in the loop.',
  },
  {
    n: '02',
    vertical: 'Customer experience · Fortune 500',
    tag: 'Cross-tenant BOLA',
    accent: 4,
    title: 'Read thousands of other companies’ live customer chats from an account that owned nothing',
    body: 'The platform’s only authorization was a caller-supplied user-id header the backend never verified. A canary account owning no data listed more than two thousand other tenants’ live support conversations, pulled their agents’ system prompts word for word, and could create and delete customer records anonymously.',
  },
  {
    n: '03',
    vertical: 'E-commerce',
    tag: 'Data exfiltration',
    accent: 2,
    title: 'Got a storefront’s AI assistant to hand out a customer export with no login',
    body: 'Asked for analytics, the commerce agent minted a pre-signed download link to a CSV of customer records and streamed it back in a hidden tool result. The link carried no cookie, token or session. A plain request returned names, emails, locations and order totals.',
  },
] as const
