import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Loading...");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    let data;
try {
  data = await res.json();
  setResponse(data.result || "Nu am primit un răspuns valid.");
} catch (e) {
  setResponse("A apărut o eroare. Verifică consola.");
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>IrinaBot v2 🤖</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Scrie o întrebare pentru IrinaBot..."
          style={{ width: "100%", padding: 10 }}
        />
        <button type="submit" style={{ marginTop: 10 }}>Trimite</button>
      </form>
      <div style={{ marginTop: 20 }}>
        <strong>Răspuns:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
