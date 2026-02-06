import { GoogleGenerativeAI } from "@google/generative-ai";
import { DesignSystem } from "../types";

// NOTE: In a real app, this API key should come from an env variable.
// For this demo, we are using the user's provided key or a placeholder.
const API_KEY = "YOUR_API_KEY_HERE"; // User must replace this
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateDesignSystem = async (prompt: string, currentSystem: DesignSystem): Promise<DesignSystem> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const systemPrompt = `
    You are a Senior UI Engineer obsessed with WCAG 2.1 AA Accessibility.
    
    User Request: "${prompt}"
    
    RULES FOR COLOR GENERATION (MATHEMATICALLY STRICT):
    1. The 'primary' color must be distinct and professional.
    2. The 'light.text' must have a 4.5:1 contrast ratio against 'light.canvas'.
    3. The 'dark.text' must have a 4.5:1 contrast ratio against 'dark.canvas'.
    4. 'neutral' colors must be a stepped scale from 50 (lightest) to 900 (darkest).
    5. Return a complete JSON object that matches the 'DesignSystem' interface structure.
    
    Return ONLY a JSON object merging the new values into the DesignSystem.
    DO NOT include markdown formatting or backticks.
  `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    // Simple JSON parse cleaning
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const newValues = JSON.parse(jsonStr);
    
    return { ...currentSystem, ...newValues };
  } catch (error) {
    console.error("AI Generation failed:", error);
    return currentSystem;
  }
};