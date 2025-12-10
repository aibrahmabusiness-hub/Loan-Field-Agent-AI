import { GoogleGenAI, Schema } from "@google/genai";
import { LOAN_AGENT_SYSTEM_INSTRUCTION } from "../constants";
import { LoanApplicationData } from "../types";

// Helper to convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const processLoanEntry = async (
  input: string | Blob
): Promise<LoanApplicationData> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Define the parts for the model
  const parts: any[] = [];

  if (typeof input === 'string') {
    // Explicit instruction for text input translation
    parts.push({ text: `Analyze the following text (which may be in any language), translate it to English, and extract loan application details: "${input}"` });
  } else {
    // It's a blob (audio)
    const base64Audio = await blobToBase64(input);
    parts.push({
      inlineData: {
        mimeType: input.type,
        data: base64Audio,
      },
    });
    // Add a text prompt to guide the audio processing (Explicit translation instruction)
    parts.push({ text: "Listen to the audio (which may be in any language, e.g., Hindi, Spanish, etc.), translate the content to English, and extract the loan application details according to the schema." });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        systemInstruction: LOAN_AGENT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        // Setting a high temperature for creativity isn't needed here; we want precision.
        temperature: 0.2, 
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response from Gemini.");
    }

    const data: LoanApplicationData = JSON.parse(responseText);
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};