const API_BASE_URL = "http://localhost:5000/api";

/**
 * Helper function to perform fetch with exponential backoff retry logic.
 */
async function fetchWithRetry(url, options = {}, retries = 2, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // If we got a rate-limiting or server error, throw to retry
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`Server returned status ${response.status}`);
      }
      // For other client errors (400, 403, etc.), parse and return directly without retry
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`apiService: Request failed. Retrying in ${delay}ms... (${retries} retries left). Error:`, error.message);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Sends a message and current chat history to the Express backend.
 * Supports sending an optional image file for multimodal analysis.
 * 
 * @param {string} message - The student's new query
 * @param {Array} history - Active chat history
 * @param {File|null} imageFile - Uploaded chemical diagram or image
 * @returns {Promise<Object>} Response containing { success: true, reply: string }
 */
export async function chatWithTutor(message, history = [], imageFile = null) {
  const url = `${API_BASE_URL}/chat`;
  let options = {};

  try {
    if (imageFile) {
      // Use FormData for multimodal file uploads
      const formData = new FormData();
      formData.append("message", message);
      formData.append("history", JSON.stringify(history));
      formData.append("image", imageFile);

      options = {
        method: "POST",
        body: formData, // Fetch automatically sets correct multipart headers
      };
    } else {
      // Standard JSON request
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history,
        }),
      };
    }

    const data = await fetchWithRetry(url, options);
    return data;
  } catch (error) {
    console.error("apiService.chatWithTutor failed:", error);
    
    // Check if the server is offline entirely
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return {
        success: false,
        message: "Unable to connect to the Catalyst AI backend. Please verify your Express server is running on port 5000.",
        isOffline: true,
      };
    }

    return {
      success: false,
      message: error.message || "An unexpected error occurred while communicating with the AI tutor.",
    };
  }
}

/**
 * Queries the Express backend to dynamically generate a 10-question quiz.
 * 
 * @param {string} topicContent - Chapter content serialization
 * @param {string} difficulty - Difficulty tier ("easy", "medium", "hard")
 * @returns {Promise<Object>} Response containing { success: true, quiz: Array }
 */
export async function generateAIQuiz(topicContent, difficulty = "medium") {
  const url = `${API_BASE_URL}/quiz/generate`;

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicContent,
        difficulty,
      }),
    };

    const data = await fetchWithRetry(url, options);
    return data;
  } catch (error) {
    console.error("apiService.generateAIQuiz failed:", error);
    
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("Unable to connect to the Catalyst AI backend server (port 5000 is offline).");
    }
    
    throw error;
  }
}
