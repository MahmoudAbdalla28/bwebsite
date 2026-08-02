// Case studies from our own authorized engagements. Every entry is a real,
// confirmed finding pulled from the cortex graph. Targets are anonymized to
// their vertical and agent type; failure patterns only, no working payloads,
// no CVEs, no named companies. This is the "not-LARP" section, so nothing goes
// in that we did not actually confirm firsthand.
//
// Source engagements (internal, not for the page): 01 GitHub Copilot VRP,
// 02 Cignara/LG CX platform, 03 Avoca voice, 04 Shopify Sidekick,
// 05 Discourse H1, 06 1mind. Kept here so the mapping is auditable.
export const engagements = [
  {
    n: '01',
    vertical: 'Developer tooling',
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
    vertical: 'Field services',
    tag: 'Ownership-unverified lookup',
    accent: 2,
    title: 'Made a voice agent read strangers’ account details to an anonymous caller',
    body: 'An anonymous caller handed the AI phone agent any name or address and it ran a live backend lookup with no ownership check, confirming whether the record existed and reading back service history and the account-holder’s name. Asked how it knew, the agent said it pulled the data live from the system, no guessing.',
  },
  {
    n: '04',
    vertical: 'E-commerce',
    tag: 'Data exfiltration',
    accent: 3,
    title: 'Got a storefront’s AI assistant to hand out a customer export with no login',
    body: 'Asked for analytics, the commerce agent minted a pre-signed download link to a CSV of customer records and streamed it back in a hidden tool result. The link carried no cookie, token or session. A plain request returned names, emails, locations and order totals.',
  },
  {
    n: '05',
    vertical: 'Online communities',
    tag: 'Broken tool approval',
    accent: 5,
    title: 'Beat an AI action-approval gate by charging it to the wrong account',
    body: 'When a privileged agent action needed sign-off, the platform checked the approval against the admin bot’s permissions rather than the moderator who clicked approve. On sixteen of nineteen gated tools, a lower-privileged approver could green-light actions they were never entitled to run.',
  },
  {
    n: '06',
    vertical: 'Sales automation',
    tag: 'Unauthenticated IDOR',
    accent: 3,
    title: 'Pulled other visitors’ live chat sessions from an open endpoint',
    body: 'The agent’s backend served full avatar and session records, down to emails, account ids, page context and another visitor’s identity, to requests with no token or ownership binding. Private, unlisted records leaked the same as public ones, and short slugs made them enumerable.',
  },
] as const
