import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({ error: err.message });
    return;
  }

  const { prompt } = req.body;

  try {
    const chatResponse = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are IrinaBot, a warm, kind, and wise AI based on the memories and values of someone dear." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4",
    });

    res.status(200).json({ result: chatResponse.choices[0].message.content });
  } catch (err) {
    console.log("EROARE API:", err); // 🔍 Va afișa ce s-a întâmplat în Vercel
    res.status(500).json({ error: err.message });
  }
}
