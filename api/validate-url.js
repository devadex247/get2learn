export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing on Vercel.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { url: videoUrl } = body || {};
  if (!videoUrl) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  const systemInstruction = `
You are an expert content curator for a software engineering and technical learning platform.
The user has provided a URL. 
Based on the URL structure, domain, and any recognizable slug, determine if this is likely an educational technical video (e.g., programming, system design, DevOps).
Infer the following structured JSON output:
{
  "is_educational": boolean (true if it seems like a tech learning resource, false otherwise),
  "title": string (A plausible title based on the slug. Convert dashes to spaces and capitalize),
  "topic": string (The main tech topic, e.g. "React", "Python", "DevOps", "Frontend"),
  "level": string ("Beginner", "Intermediate", or "Advanced"),
  "duration_minutes": number (A plausible integer between 10 and 60),
  "reason": string (A short friendly explanation of why you accepted or rejected it)
}
Return ONLY valid JSON matching this schema, with no markdown code fences.
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: `URL: ${videoUrl}` }]
          }
        ],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.2
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API Error:', errText);
      return res.status(geminiRes.status).json({ error: 'Gemini API Error', details: errText });
    }

    const data = await geminiRes.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const parsed = JSON.parse(rawText);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
