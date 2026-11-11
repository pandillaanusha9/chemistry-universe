const CHEMISTRY_INSTRUCTIONS = `
You are a friendly chemistry doubt-clearing tutor for students.
Answer only chemistry-related doubts, especially organic and inorganic chemistry.
Keep answers clear, exam-useful, and concise.
Use mechanisms, trends, exceptions, and memory hooks when useful.
If a question is outside chemistry, politely redirect to chemistry.
Do not invent facts. If unsure, say what to verify.
`;

function buildGeminiPrompt(message, history) {
  const recentHistory = Array.isArray(history)
    ? history
        .slice(-8)
        .map((item) => `${item.sender === "user" ? "Student" : "Tutor"}: ${item.text}`)
        .join("\n")
    : "";

  return `${CHEMISTRY_INSTRUCTIONS}

Recent conversation:
${recentHistory || "No previous messages."}

Student: ${message}
Tutor:`;
}

function extractGeminiText(data) {
  const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
  return candidates
    .flatMap((candidate) => candidate?.content?.parts || [])
    .map((part) => part.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

const GEMINI_TIMEOUT_MS = 15000;
const FALLBACK_GEMINI_MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-2.5-flash"];

function uniqueModels(primaryModel) {
  return [primaryModel, ...FALLBACK_GEMINI_MODELS].filter((model, index, models) => model && models.indexOf(model) === index);
}

function shouldTryFallback(status) {
  // A model can be unavailable to a project even when the API key is valid.
  // Continue to a supported fallback in that case instead of sending the UI
  // into its generic local-answer path.
  return status === 404 || status === 429 || status === 500 || status === 503 || status === 504;
}

async function requestGeminiReply({ apiKey, model, message, history }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: buildGeminiPrompt(message, history) }]
            }
          ],
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 550
          }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data?.error?.message || "Gemini request failed");
      error.status = response.status;
      throw error;
    }

    return extractGeminiText(data) || "I could not form a clear answer. Please ask the chemistry doubt again with one more detail.";
  } catch (error) {
    if (error.name === "AbortError") {
      const timeoutError = new Error("Gemini request timed out");
      timeoutError.status = 504;
      throw timeoutError;
    }

    if (!error.status) error.status = 504;
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateChemistryReply({ message, history = [] }, env = process.env) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    const error = new Error("GEMINI_API_KEY is not configured");
    error.status = 503;
    throw error;
  }

  if (!message || typeof message !== "string") {
    const error = new Error("Message is required");
    error.status = 400;
    throw error;
  }

  let lastError;

  for (const model of uniqueModels(env.GEMINI_MODEL || "gemini-2.5-flash-lite")) {
    try {
      return await requestGeminiReply({ apiKey, model, message, history });
    } catch (error) {
      lastError = error;
      if (!shouldTryFallback(error.status)) break;
    }
  }

  throw lastError || new Error("Gemini request failed");
}
