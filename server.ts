import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini safely with the required user agent and key
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY environment variable is not defined.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY_FOR_BUILD_ONLY",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Route for AI Prompt Optimization
app.post("/api/optimize-prompt", async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPrompt, userFeedback, currentState } = req.body;

    if (!userFeedback || !userFeedback.trim()) {
      res.status(400).json({ error: "Feedback instruction is required" });
      return;
    }

    const ai = getAiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback for preview context if key is not loaded yet
      res.json({
        advisory: "⚠️ Note: GEMINI_API_KEY is not defined in the backend. I have simulated the optimization of your prompt based on your feedback: '" + userFeedback + "'. Please add your secret in Settings to activate the real-time AI analysis!",
        improvedNotes: `${currentState?.additionalNotes || ""}\n\n[AI Optimization Instruction]: Ensure high emphasis on the requested theme: "${userFeedback}". Inject specific Texas local codes or industry checklists corresponding directly to those constraints.`,
      });
      return;
    }

    const systemInstruction = `You are an elite Prompt Engineering Advisor specialized in AI Website Builders (like Replit, Lovable, v0, Bolt, and Cursor).
Your task is to analyze an accounting website builder prompt and the user's specific feedback or request.
You must return a structured JSON response containing:
1. "improvedNotes": A condensed, extremely high-impact set of instructions to append or override the current customization state. Write this using professional, directive technical language tailored for advanced LLM parses.
2. "advisory": A brief, highly professional 2-3 paragraph explanation of why you made these modifications, the specific technical strategies applied, and tips for the user on how to feed this prompt to their target builder. Make it encouraging, professional, and clear. Avoid listing file paths or mock infrastructure.

Your output MUST be strictly formatted as valid JSON adhering to the target schema.`;

    const promptText = `
Current Prompt configuration and details:
${currentPrompt}

The user wants to make the following adjustments/refinements:
"${userFeedback}"

Current state info:
${JSON.stringify(currentState)}

Please generate the optimal prompt edits and advisory guidelines according to our layout standard.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedNotes: {
              type: Type.STRING,
              description: "High impact technical directives or prompt injects based on the user's feedback.",
            },
            advisory: {
              type: Type.STRING,
              description: "A professional and friendly explanation analyzing the prompt strategy and advising on next steps.",
            },
          },
          required: ["improvedNotes", "advisory"],
        },
      },
    });

    const bodyText = response.text?.trim() || "{}";
    const data = JSON.parse(bodyText);

    res.json({
      advisory: data.advisory,
      improvedNotes: data.improvedNotes,
    });
  } catch (error: any) {
    console.error("Gemini optimization error:", error);
    res.status(500).json({
      error: "Failed to optimize prompt with AI",
      details: error.message || String(error),
    });
  }
});

// For development, mount Vite middleware. Otherwise serve production build static files.
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Workspace server running on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
