const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SOURCES = {
  fragrance: 'https://sawaifragrances.com/',
  diffuser: 'https://ezeperfume.com/pages/about-us'
};

function parseHtml(html, url) {
  const $ = cheerio.load(html);
  const title = $('title').first().text() || null;
  const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || null;
  const h1 = $('h1').first().text().trim() || null;
  let paragraph = null;
  $('p').each((i, el) => {
    const t = $(el).text().trim();
    if (!paragraph && t.length > 20) paragraph = t;
  });
  return { url, ok: true, title, description, h1, paragraph };
}

app.get('/api/fetch', async (req, res) => {
  try {
    const source = req.query.source;
    if (!source || !SOURCES[source]) return res.status(400).json({ ok: false, error: 'invalid source' });
    const url = SOURCES[source];
    const resp = await fetch(url, { method: 'GET' });
    const text = await resp.text();
    if (!resp.ok) return res.status(502).json({ ok: false, status: resp.status, statusText: resp.statusText });
    const parsed = parseHtml(text, url);
    return res.json(parsed);
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Proxy server listening on http://localhost:${port}`));
