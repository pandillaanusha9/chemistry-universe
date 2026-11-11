import { generateChemistryReply } from "./chemistryChatCore.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const reply = await generateChemistryReply(request.body || {});
    return response.status(200).json({ reply });
  } catch (error) {
    return response.status(error.status || 500).json({
      error: error.message || "Chemistry chat failed"
    });
  }
}
