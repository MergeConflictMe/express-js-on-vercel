import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Получаем URL из параметра запроса
  const targetUrl = req.query.url as string

  // Если параметра нет, показываем приветствие
  if (!targetUrl) {
    return res.status(200).send('ClearWeb Proxy is running. Use ?url=https://example.com')
  }

  // Делаем запрос к целевому сайту
  fetch(targetUrl)
    .then(response => response.text())
    .then(html => {
      // Отправляем HTML обратно с правильными заголовками
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.send(html)
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}
