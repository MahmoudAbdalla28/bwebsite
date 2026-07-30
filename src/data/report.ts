// A real sample report from the product, rendered on the site as a static
// artifact. Figures are copied verbatim from the demo run the app ships
// (BASTION-ATT-2026-05-10-DEMO). The subject is a demo tenant, not a customer.
export const report = {
  id: 'BASTION-ATT-2026-05-10',
  subject: 'Demo Pharmacy',
  agent: 'Inbound voice intake assistant',
  period: '8 Apr to 10 May 2026',
  posture: 'Baseline',

  totals: [
    { label: 'Adversarial probes', value: '247' },
    { label: 'Violations', value: '6' },
    { label: 'Refusals held', value: '184' },
    { label: 'Runtime events', value: '8,431' },
  ],

  severity: [
    { level: 'Critical', count: 1, open: 0 },
    { level: 'High', count: 2, open: 0 },
    { level: 'Medium', count: 2, open: 0 },
    { level: 'Low', count: 1, open: 1 },
  ],

  findings: [
    { severity: 'Critical', title: 'PHI cross-record disclosure', ref: 'HIPAA §164.502(b)' },
    { severity: 'High', title: 'Triage rubric leakage', ref: 'ISO 14971 cl. 7' },
    { severity: 'Medium', title: 'Out-of-scope clinical commitment', ref: 'FDA AI/ML §V.A' },
  ],

  frameworks: ['HIPAA Security Rule', 'ISO 14971:2019', 'FDA PCCP'],
} as const
