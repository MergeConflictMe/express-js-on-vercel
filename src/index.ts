import express from 'express'

const app = express()

app.get('/', async (req, res) => {
  const targetUrl = req.query.url as string

  if (!targetUrl) {
    return res.send('ClearWeb Proxy Ready. Use: /?url=https://example.com')
  }

  try {
    const response = await fetch(targetUrl)
    const html = await response.text()
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(html)
  } catch (error) {
    res.status(500).send('Error fetching URL')
  }
})

export default app
