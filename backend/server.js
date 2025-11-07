import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

let cachedText = "";

// ✅ Load PDF text once when server starts
async function loadPdfText() {
  try {
    // Go up one folder from backend → public/pratapInfo.pdf
    const filePath = path.join(process.cwd(), "..", "public", "pratapInfo.pdf");
    const data = await fs.readFile(filePath);
    const pdfData = await pdfParse(data);
    cachedText = pdfData.text.replace(/\s+/g, " ").trim();
    console.log("✅ PDF loaded, length:", cachedText.length);
  } catch (err) {
    console.error("❌ Failed to load PDF:", err);
  }
}
loadPdfText();

// ✅ Chat API endpoint
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Missing question" });

    // Build the AI prompt
    const prompt = `
You are Pratap's AI assistant. 
Use this resume info to answer questions.
If you cannot find the answer, say "I'm not sure, please check my portfolio website."
Context:
${cachedText.slice(0, 6000)}

Question: ${question}
Answer:
`;
// 🔹 Try Gemma first, fallback to Phi-3-mini
let response = await fetch(
  "https://api-inference.huggingface.co/models/google/gemma-2b-it",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  }
);

if (response.status === 404) {
  console.log("🔁 Model not found, switching to Phi-3-mini...");
  response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );
}
    const text = await response.text();
    console.log("🔹 Raw HF Response:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      console.error("❌ HF JSON parse error:", err);
      return res.json({ answer: "No valid response from model (check model name or key)." });
    }

    // ✅ Extract the generated answer
    const answer =
      Array.isArray(result) && result[0]?.generated_text
        ? result[0].generated_text.split("Answer:")[1]?.trim() ||
          result[0].generated_text
        : "No valid response from model.";

    res.json({ answer });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start the backend server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
