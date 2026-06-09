import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const targetUrl = req.query.url as string

  if (!targetUrl) {
    return res.status(400).json({ error: 'Add ?url= parameter' })
  }

  fetch(targetUrl)
    .then(r => r.text())
    .then(html => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.send(html)
    })
    .catch(e => res.status(500).json({ error: e.message }))
}
