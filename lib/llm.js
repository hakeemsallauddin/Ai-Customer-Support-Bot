import fetch from 'node-fetch';

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = process.env.OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "mistralai/mixtral-8x7b-instruct"; // Change to your preferred OpenRouter model

async function callOpenRouterLLM(messages) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages
    })
  });

  if (!res.ok) {
    throw new Error(`LLM API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// Generate response with conversation summarization and next action suggestion
export async function generateResponseWithExtras(conversation) {
  // Step 1: Summary
  const summaryPrompt = `Summarize the key points of this conversation briefly:\n\n${conversation}\n\nSummary:`;
  const summary = await callOpenRouterLLM([{ role: "user", content: summaryPrompt }]);

  // Step 2: Answer + next actions
  const answerPrompt = `You are a helpful customer support AI. Based on the conversation summary below, answer the user, and suggest up to 3 next actions they might want to take.\n\nConversation summary:\n${summary}\n\nRespond with the answer first, followed by a separate "Next Actions" list.`;
  const answer = await callOpenRouterLLM([{ role: "user", content: answerPrompt }]);

  return { answer, summary };
}
