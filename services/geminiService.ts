
import { GoogleGenAI, Type } from "@google/genai";
import type { SuperconductorData } from '../types';

const getGeminiService = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const superconductorSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The common name of the superconductor." },
    type: { type: Type.STRING, description: "The classification of the superconductor (e.g., 'Type I', 'Type II', 'High-Temperature')." },
    description: { type: Type.STRING, description: "A detailed description of the superconductor, its properties, and significance." },
    criticalTemperatureKelvin: { type: Type.NUMBER, description: "The critical temperature (Tc) in Kelvin. Use null if not widely agreed upon or known." },
    criticalTemperatureCelsius: { type: Type.NUMBER, description: "The critical temperature (Tc) in Celsius. Use null if not widely agreed upon or known." },
    applications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key applications or potential uses."
    },
    crystalStructure: { type: Type.STRING, description: "The crystal structure of the material (e.g., 'Perovskite', 'Hexagonal'). Use null if not applicable or known." },
    discoveredBy: { type: Type.STRING, description: "The person or group credited with its discovery. Use null if not known." },
    yearOfDiscovery: { type: Type.INTEGER, description: "The year of its discovery. Use null if not known." },
  },
  required: ["name", "type", "description", "criticalTemperatureKelvin", "criticalTemperatureCelsius", "applications", "crystalStructure", "discoveredBy", "yearOfDiscovery"]
};


export const getSuperconductorInfo = async (name: string): Promise<SuperconductorData> => {
  const ai = getGeminiService();

  const prompt = `
    Analyze the superconductor named "${name}".
    Provide a detailed overview based on the provided JSON schema.
    If any piece of information is not available or widely known, use null for that field.
    Convert the critical temperature to both Kelvin and Celsius.
    Your response must be a single, valid JSON object that strictly adheres to the schema. Do not include any markdown formatting like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: superconductorSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the API.");
    }
    
    // The response text should be a clean JSON string
    return JSON.parse(text) as SuperconductorData;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to fetch data from the Gemini API. The material may not be recognized or there could be an issue with the service.");
  }
};
