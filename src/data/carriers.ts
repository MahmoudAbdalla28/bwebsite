// Everything on the insurance page has to be attributable. These are the
// facts it is allowed to assert, with where they came from.
//
// Reported by the FT and picked up widely (Nov 2025 onward). AIG, Great
// American and WR Berkley filed with US regulators for AI exclusions.
export const facts = [
  {
    claim: 'AIG, Great American and WR Berkley have filed with US regulators to exclude AI-related risk from corporate policies',
    href: 'https://techcrunch.com/2025/11/23/ai-is-too-risky-to-insure-say-people-whose-job-is-insuring-risk/',
    source: 'techcrunch',
  },
  {
    claim: 'The WR Berkley language reaches any actual or alleged use of AI, including products and services that merely incorporate it, drafted for D&O, E&O and fiduciary',
    href: 'https://www.insurancebusinessmag.com/us/news/technology/major-insurers-seek-approval-to-limit-liability-for-airelated-claims--report-557553.aspx',
    source: 'insurance business',
  },
  {
    claim: 'AIG told regulators it has no immediate plans to use its exclusion, but wants it available as claim frequency and scale rise',
    href: 'https://techcrunch.com/2025/11/23/ai-is-too-risky-to-insure-say-people-whose-job-is-insuring-risk/',
    source: 'techcrunch',
  },
]

// The stated fear, in the industry's own words. This is the part I originally
// got wrong: the blocker carriers describe is not "we have no loss data", it is
// correlation. One large loss is absorbable. The same failure firing across
// every insured at once is not.
export const stated =
  'One company’s AI deployment going wrong is a loss an insurer can absorb. A thousand or ten thousand of them, all at once, from the same underlying failure, is not.'
