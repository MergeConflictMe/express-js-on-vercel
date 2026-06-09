import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Добавляем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Получаем URL из параметра запроса
  const targetUrl = req.query.url as string

  if (!targetUrl) {
    return res.status(400).json({ error: 'Use: ?url=https://example.com' })
  }

  // Делаем запрос к целевому сайту
  fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  })
    .then(response => response.text())
    .then(html => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.status(200).send(html)
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}
