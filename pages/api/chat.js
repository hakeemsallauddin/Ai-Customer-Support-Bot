import Stream from "stream";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message } = req.body;

  // Call OpenRouter's API here with fetch, example:

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'AI Customer Support Bot'
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [{ role: 'user', content: message }],
      max_tokens: 256,
      temperature: 1.0
    }),
  });

  const data = await response.json();

  res.status(200).json({ answer: data.choices?.[0]?.message?.content ?? 'Error' });
}
