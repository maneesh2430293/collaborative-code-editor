// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { config } from "../config/env";

// export class GeminiService {
//   private genAI: GoogleGenerativeAI;
//   private model: any;

//   constructor() {
//     this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
//     //this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
//     // Optimized for fast, real-time completion
//     // this.model = this.genAI.getGenerativeModel({
//     //   model: "gemini-1.5-flash-latest",
//     // });
//     // The most advanced model, slightly slower
//     //this.model = this.genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

//     this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   }

//   async generateCompletion(codeContext: string): Promise<string> {
//     try {
//       const prompt = `
//         You are an intelligent code completion assistant.
//         Your task is to complete the following code snippet.
//         Rules:
//         1. Return ONLY the code that completes the current line or block.
//         2. Do not use Markdown formatting (no \`\`\`).
//         3. Do not add explanations.

//         Current Code:
//         ${codeContext}
//       `;
//       console.log(codeContext + " before result");
//       const result = await this.model.generateContent(prompt);
//       console.log(result);
//       const response = await result.response;
//       const text = response.text();

//       // Clean up any accidental whitespace/markdown provided by AI
//       return text.replace(/```/g, "").trim();
//     } catch (error) {
//       console.error("Gemini Service Error:", error);
//       throw new Error("Failed to generate code completion");
//       //console.warn("⚠️ API Failed. Switching to MOCK mode."); // ⚠️ We catch it here

//       // 1. Fake Delay (so it feels like AI is thinking)
//       //await new Promise((resolve) => setTimeout(resolve, 500));

//       // 2. Return Mock Data instead of throwing error
//       //return `// [MOCK AI RESPONSE] \nconsole.log("Hello from Mock AI!");`;
//     }
//   }
// }

import { GoogleGenAI } from "@google/genai";
import { config } from "../config/env";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // The new SDK automatically looks for GEMINI_API_KEY in process.env
    // But we can pass it explicitly to be safe
    this.ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  }

  async generateCompletion(codeContext: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash", // Using the newest model
        contents: `Complete this code (return only code): ${codeContext}`,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // 0 = Disable thinking for speed
          },
        },
      });

      // The response format is slightly different in the new SDK
      const text = response.text || "";
      return text.replace(/```/g, "").trim();
    } catch (error) {
      console.error("Gemini 2.5 Error:", error);
      return "// [MOCK] Error using Gemini 2.5";
    }
  }
}
