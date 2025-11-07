// api/chat.js - Vercel Serverless Function
import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';

let cachedText = null;

async function loadPdf() {
  if (cachedText) return cachedText;
  
  // In Vercel, files are in different locations
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'pratapInfo.pdf'),
    path.join(process.cwd(), 'api', 'pratapInfo.pdf'),
    '/var/task/public/pratapInfo.pdf'
  ];
  
  let data;
  for (const filePath of possiblePaths) {
    try {
      data = await fs.readFile(filePath);
      break;
    } catch (err) {
      continue;
    }
  }
  
  if (!data) throw new Error('PDF not found');
  
  const pdf = await pdfParse(data);
  cachedText = (pdf.text || '').replace(/\s+/g, ' ').trim();
  if (cachedText.length > 20000) cachedText = cachedText.slice(0, 20000);
  return cachedText;
}

function retrieveExcerpt(docText, question, maxChars = 3000) {
  if (!docText) return '';
  const qWords = Array.from(new Set((question || '').toLowerCase().match(/\w+/g) || []));
  if (!qWords.length) return docText.slice(0, maxChars);

  const sentences = docText.match(/[^\.!\?]+[\.!\?]+/g) || [docText];
  const scored = sentences.map(s => {
    const sLower = s.toLowerCase();
    const score = qWords.reduce((acc, w) => acc + (sLower.includes(w) ? 1 : 0), 0);
    return { s, score };
  }).filter(x => x.score > 0);

  if (!scored.length) return docText.slice(0, maxChars);
  scored.sort((a,b) => b.score - a.score);
  
  let out = '';
  for (const { s } of scored) {
    if ((out + s).length > maxChars) break;
    out += ' ' + s;
  }
  return out || docText.slice(0, maxChars);
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'question required' });
  }

  try {
    const doc = await loadPdf();
    const excerpt = retrieveExcerpt(doc, question, 3000);

    const systemPrompt = `You are an assistant that answers questions using ONLY the provided DOCUMENT EXCERPT. If unsure, say "I don't know from the document."`;
    const userPrompt = `DOCUMENT EXCERPT:\n${excerpt}\n\nQUESTION: ${question}\n\nAnswer:`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 400,
        temperature: 0.2,
      }),
    });

    const json = await response.json();
    const answer =
      json?.choices?.[0]?.message?.content ||
      json?.error?.message ||
      'No valid response from model.';

    return res.status(200).json({ answer: answer.trim() });
  } catch (err) {
    console.error('api/chat error:', err);
    return res.status(500).json({ error: String(err.message) });
  }
}