import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/env";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    //this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    // Optimized for fast, real-time completion
    // this.model = this.genAI.getGenerativeModel({
    //   model: "gemini-1.5-flash-latest",
    // });
    // The most advanced model, slightly slower
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  }

  async generateCompletion(codeContext: string): Promise<string> {
    try {
      const prompt = `
        You are an intelligent code completion assistant.
        Your task is to complete the following code snippet.
        Rules:
        1. Return ONLY the code that completes the current line or block.
        2. Do not use Markdown formatting (no \`\`\`).
        3. Do not add explanations.
        
        Current Code:
        ${codeContext}
      `;
      console.log(codeContext + " before result");
      const result = await this.model.generateContent(prompt);
      console.log(result);
      const response = await result.response;
      const text = response.text();

      // Clean up any accidental whitespace/markdown provided by AI
      return text.replace(/```/g, "").trim();
    } catch (error) {
      console.error("Gemini Service Error:", error);
      throw new Error("Failed to generate code completion");
    }
  }
}
