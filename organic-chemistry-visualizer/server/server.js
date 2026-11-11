import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend and JSON request parsing
app.use(cors());
app.use(express.json());

// Set up in-memory storage for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini API
const geminiApiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (geminiApiKey) {
  genAI = new GoogleGenerativeAI(geminiApiKey);
  console.log("Catalyst AI Backend: Google Generative AI client initialized.");
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. Live AI features will be unavailable.");
}

// System instruction for the chat tutor
const CHEMISTRY_TUTOR_SYSTEM_INSTRUCTION = `You are "Catalyst AI", an elite, senior IIT-JEE Advanced and NEET Organic Chemistry faculty member and competitive question setter. Your tone is academic, scientifically precise, highly encouraging, and deeply educational.

Your goals:
1. Answer organic chemistry questions with absolute scientific correctness. Avoid generic or superficial answers.
2. Provide step-by-step reaction mechanisms (Protonation, Nucleophilic Attack, Leaving Group Departure, Deprotonation) indicating key intermediates (carbocations, carbanions, cyclic halonium ions, benzyne, free radicals) and stereochemical outcomes (Walden inversion, racemization, anti-periplanar elimination, syn-addition).
3. Predict reaction products, identify reagents, explain named reactions (Cannizzaro, Aldol, Perkin, Beckmann, Hoffmann bromamide, etc.), and perform multi-step synthesis pathways.
4. Calculate sigma and pi bonds, count valence electrons, predict hybridization, and explain inductive, mesomeric, resonance, and hyperconjugation effects.

INTERACTIVE QUESTION INJECTION:
If the user asks you to "Generate a question", "Give me a practice problem", "Test me", or if you feel it's an opportune moment to test their understanding, you can generate a competitive exam question.
To do this, you MUST format the question strictly as a raw JSON block wrapped in triple backticks with "json" tag inside your response, matching this exact schema:
\`\`\`json
{
  "isQuestionCard": true,
  "questionType": "MCQ" | "ASSERTION_REASON" | "REACTION_PREDICTION" | "REAGENT_IDENTIFICATION" | "SIGMA_PI_COUNT",
  "question": "The question text, e.g., 'What is the major product when propene reacts with HBr in the presence of peroxides?'",
  "reactionData": "Chemical equation, e.g., 'CH3-CH=CH2 + HBr --(peroxides)--> ?' or null if none",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "answer": "Option B text (MUST match exactly one of the strings in the options array)",
  "explanation": "Detailed step-by-step mechanical explanation explaining why that option is correct (mentioning free radical intermediates, anti-Markovnikov addition, etc.)"
}
\`\`\`
Ensure only ONE JSON block is returned per request. If you are generating a question, keep the conversational text surrounding the JSON block brief, encouraging, and natural.

MULTIMODAL OCR SUPPORT:
The user might upload images of organic structures, handwritten questions, or reaction schemes. Analyze the image with professional chemical insight, transcribe any formulas/reactions, and explain them step-by-step.`;

// Helper to convert multer buffer to Gemini inline data part
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

// Helper to clean up Markdown-wrapped JSON from Gemini output
function extractJsonArray(text) {
  try {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start !== -1 && end !== -1 && end > start) {
      const jsonString = text.substring(start, end + 1);
      return JSON.parse(jsonString);
    }
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON directly. Attempting regex extraction...", e);
    // Try clean code blocks
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (err) {
        console.error("Regex JSON parse failed:", err);
      }
    }
    throw new Error("Invalid JSON format in model output: " + text.substring(0, 100) + "...");
  }
}

// Endpoint: Chat with the AI Chemistry Tutor (Supports Text, History, and Image Uploads)
app.post("/api/chat", upload.single("image"), async (req, res) => {
  if (!genAI) {
    return res.status(503).json({
      success: false,
      message: "AI API client is not initialized. Please verify your GEMINI_API_KEY environment variable.",
    });
  }

  try {
    const { message, history } = req.body;
    let parsedHistory = [];
    if (history) {
      parsedHistory = typeof history === "string" ? JSON.parse(history) : history;
    }

    // Initialize the model with the system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: CHEMISTRY_TUTOR_SYSTEM_INSTRUCTION,
    });

    let result;

    if (req.file) {
      // Multimodal Request (Text + Image)
      const imagePart = fileToGenerativePart(req.file.buffer, req.file.mimetype);
      
      // Since it is multimodal, we can construct the prompt containing the conversation context
      let contextualPrompt = "Conversation history for reference:\n";
      parsedHistory.forEach((h) => {
        contextualPrompt += `${h.role === "user" ? "Student" : "Tutor"}: ${h.text || h.message}\n`;
      });
      contextualPrompt += `\nNew Student Message: ${message || "Please analyze this organic chemistry image."}\n`;
      contextualPrompt += "\nAnalyze the provided image and address the student's message with chemical expertise.";

      result = await model.generateContent([contextualPrompt, imagePart]);
    } else {
      // Standard Text Chat (Multi-turn)
      // Format history into the official Gemini content structure
      const chat = model.startChat({
        history: parsedHistory.map((msg) => {
          let role = msg.role;
          // Gemini expects 'user' or 'model' roles
          if (role === "bot" || role === "tutor" || role === "assistant") {
            role = "model";
          }
          return {
            role: role || "user",
            parts: [{ text: msg.text || msg.message || "" }],
          };
        }),
      });

      result = await chat.sendMessage(message);
    }

    const response = await result.response;
    const responseText = response.text();

    res.json({
      success: true,
      reply: responseText,
    });
  } catch (error) {
    console.error("Express Chat API Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while communicating with the AI chemistry engine.",
      error: error.message,
    });
  }
});

// Endpoint: Dynamic Syllabus-Aligned Quiz Generator
app.post("/api/quiz/generate", async (req, res) => {
  if (!genAI) {
    return res.status(503).json({
      success: false,
      message: "AI API client is not initialized. Please verify your GEMINI_API_KEY environment variable.",
    });
  }

  const { topicContent, difficulty } = req.body;

  if (!topicContent) {
    return res.status(400).json({
      success: false,
      message: "Missing parameter: topicContent is required to generate quiz context.",
    });
  }

  const activeDifficulty = difficulty || "medium";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an elite IIT-JEE Advanced and NEET Organic Chemistry examination architect.
You are strictly limited to generating exactly 10 questions ONLY from the provided chapter content text. DO NOT introduce external unrelated topics, but elevate the difficulty of questions to match standard competitive exams.

The output MUST be a valid JSON array containing exactly 10 question objects with the following schema:
[
  {
    "questionType": "MCQ" | "ASSERTION_REASON" | "REACTION_PREDICTION" | "MECHANISM_BASED",
    "question": "Clear, concise JEE/NEET standard question text. Use LaTeX style sub/superscripts if needed, or clear representation (e.g. C6H5OH). For Assertion-Reason, format options standardly.",
    "reactionData": "If the question involves a reaction, represent it here in ASCII format (e.g. CH3OH + PCl5 -> ?), otherwise null.",
    "options": [
      "Option A text",
      "Option B text",
      "Option C text",
      "Option D text"
    ],
    "answer": "The exact string of the correct option. It MUST match one of the options elements exactly.",
    "explanation": "Detailed step-by-step mechanism and electronic reasoning explaining why this option is correct. Sourced from inductive, resonance, steric or hyperconjugation effects."
  }
]

EXTRACTED CHAPTER MATERIAL FOR GENERATION CONTEXT:
------------------
${topicContent}
------------------

GENERATE A ${activeDifficulty.toUpperCase()} DIFFICULTY ASSESSMENT OF EXACTLY 10 MCQs.
IMPORTANT: Return ONLY the raw JSON array. DO NOT wrap it in any formatting, HTML, or conversational text. Return only valid parseable JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    console.log("Model response received. Attempting to parse JSON...");
    
    // Parse the generated quiz and validate
    const parsedQuiz = extractJsonArray(rawText);

    if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
      // Inject unique IDs for safety
      const finalizedQuiz = parsedQuiz.map((q, idx) => ({
        ...q,
        id: `ai_generated_${Date.now()}_${idx}`,
        difficulty: activeDifficulty,
        conceptTag: q.questionType,
      }));

      res.json({
        success: true,
        quiz: finalizedQuiz,
      });
    } else {
      throw new Error("Model failed to output a valid JSON array or generated an empty set.");
    }
  } catch (error) {
    console.error("Express Quiz Generation API Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating the organic chemistry quiz questions.",
      error: error.message,
    });
  }
});

// Start the Express Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Catalyst AI Chemistry Server is running on port ${PORT}`);
  console.log(` Local Gateway: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
