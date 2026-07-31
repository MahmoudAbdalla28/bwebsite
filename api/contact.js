// NOT THE LIVE PATH. trybastion.ai deploys from a vercel account we do not
// control, so RESEND_API_KEY cannot be set here. The live handler is the same
// code in the standalone `bastion-contact` project, in our own vercel team,
// which the form posts to cross-origin. Keep this in sync; if the env var ever
// lands on this project, point the form back at /api/contact.
//
// FormSubmit returned HTTP 200 and "submitted successfully" while discarding
// every message, and even once delivering, it sends from formsubmit.co with no
// SPF or DKIM alignment to trybastion.ai, so Workspace filed submissions as
// spam at random. This sends from our own verified domain and fails loudly.
export const config = { runtime: 'nodejs' }

const TO = 'team@trybastion.ai'
const FROM = 'Bastion site <noreply@trybastion.ai>'

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).send('Method Not Allowed')
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('contact: RESEND_API_KEY missing')
    return res.redirect(303, '/contact?error=1')
  }

  // accept both urlencoded (plain form post) and json
  let body = req.body
  if (typeof body === 'string') body = Object.fromEntries(new URLSearchParams(body))
  const { name = '', email = '', company = '', domain = '', agent = '', _honey = '' } = body || {}

  // the honeypot is never filled by a human, so a hit is a bot. accept and drop.
  if (_honey) return res.redirect(303, '/thanks')

  if (!email) return res.redirect(303, '/contact?error=1')

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Company', company],
    ['Domain', domain],
    ['What they are shipping', agent],
  ]

  const html = `<h2>New contact from trybastion.ai</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v) || '<em>blank</em>'}</td></tr>`)
    .join('')}</table>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Contact: ${name || email}${company ? ` (${company})` : ''}`,
        html,
        text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      }),
    })

    if (!r.ok) {
      // never pretend it worked. that is the whole point of replacing formsubmit.
      console.error('contact: resend rejected', r.status, (await r.text()).slice(0, 400))
      return res.redirect(303, '/contact?error=1')
    }
  } catch (e) {
    console.error('contact: resend threw', String(e).slice(0, 300))
    return res.redirect(303, '/contact?error=1')
  }

  return res.redirect(303, '/thanks')
}
