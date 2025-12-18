
import { GoogleGenAI, Type } from "@google/genai";

export const analyzeFoodImage = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: `Analyze this surplus cafeteria food. Provide:
            1. Name
            2. Detailed description
            3. List of key ingredients
            4. Nutritional estimates (Calories, Protein, Carbs, Fat)
            5. Carbon Footprint savings estimate (kg)
            6. Quantity available.
            Return ONLY JSON.`,
          }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            nutritionalInfo: {
              type: Type.OBJECT,
              properties: {
                calories: { type: Type.INTEGER },
                protein: { type: Type.STRING },
                carbs: { type: Type.STRING },
                fat: { type: Type.STRING }
              }
            },
            carbonSavedKg: { type: Type.NUMBER },
            quantity: { type: Type.INTEGER },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["name", "description", "ingredients", "nutritionalInfo", "carbonSavedKg", "quantity", "tags"]
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
