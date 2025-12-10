import { useState } from "react";
import axios from "axios";

export function useGemini() {
  const [loading, setLoading] = useState(false);

  async function askGemini(prompt) {
    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }
      );

      setLoading(false);

      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response."
      );
    } catch (error) {
      console.error("Gemini Error:", error);
      setLoading(false);
      return "Error fetching response.";
    }
  }

  return { askGemini, loading };
}
