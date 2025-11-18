import { Request, Response } from "express";
import { GeminiService } from "../services/gemini.service";

const geminiService = new GeminiService();

export const getCodeCompletion = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    console.log(code);

    if (!code) {
      return res.status(400).json({ error: "Code context is required" });
    }

    const suggestion = await geminiService.generateCompletion(code);
    console.log(suggestion);

    return res.json({ suggestion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
