import { GoogleGenAI } from "@google/genai";

// This file is not committed to git and should contain your API key.
// For this environment, we assume the API key is set in the environment variables.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates a unique, localized paragraph about vehicle maintenance in Mascouche
 * using Google Maps grounding for hyper-local context.
 */
export const getLocalAdvantageContent = async (language: 'en' | 'fr') => {
  try {
    const langInstruction = language === 'fr' ? 'Répondez en français.' : 'Respond in English.';
    const prompt = `
      As a local automotive expert in Mascouche, QC, Canada, write a short, helpful paragraph for a mechanic shop's website. 
      Discuss the importance of reliable vehicle maintenance considering local driving conditions, routes, or landmarks. 
      For example, you can mention specific roads, seasonal issues like potholes, or local traffic patterns. 
      Be professional, friendly, and reassuring. ${langInstruction}
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
            retrievalConfig: {
              // Geolocation for Mascouche, QC
              latLng: {
                latitude: 45.75,
                longitude: -73.6
              }
            }
          }
      },
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, sources };
  } catch (error) {
    console.error("Error generating local advantage content:", error);
    return null;
  }
};

/**
 * Provides a preliminary diagnostic suggestion based on user input.
 * Instructs the model to return a structured JSON response.
 */
export const getDiagnosticSuggestion = async (problem: string, language: 'en' | 'fr') => {
    try {
        const langInstruction = language === 'fr' 
            ? "Your entire JSON response, including diagnosis and suggestion_text, must be in conversational French."
            : "Your entire JSON response must be in conversational English.";
        
        const serviceSlugs = "general-mechanics, ac-service, heavy-vehicle-mechanics, trailer-repair, generator-services, welding-assembly";

        const systemInstruction = `
            You are an expert AI mechanic assistant for "MGC Réparation". Your goal is to provide a brief, helpful preliminary diagnosis (1-2 sentences MAX) and then recommend ONE relevant service. Be friendly, professional, and concise. The user's input might be a direct description or a structured sentence summarizing their choices from a guided flow.

            RULES:
            1. Analyze the user's problem, whether it's free-text or structured (e.g., "The user is reporting a noise. The noise sounds like grinding or squealing.").
            2. Provide a short, easy-to-understand preliminary diagnosis. DO NOT give safety warnings or tell them you are an AI.
            3. Recommend the MOST RELEVANT service from this list: ${serviceSlugs}.
            4. If the problem is vague, general, or you are unsure, ALWAYS recommend "general-mechanics" for a proper inspection.
            5. Create a compelling call-to-action button text for your recommendation.
            6. You MUST respond ONLY with a single, valid JSON object. Do not include any other text or markdown formatting.
            
            JSON FORMAT:
            {"diagnosis": "Your short diagnosis here.", "suggestion_slug": "the-chosen-service-slug", "suggestion_text": "Your call-to-action button text here"}

            ${langInstruction}
        `.trim();
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: problem,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json'
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error getting diagnostic suggestion:", error);
        return null;
    }
};