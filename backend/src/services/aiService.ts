import Groq from "groq-sdk";
import { env } from "../config/env";

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

export const generateDescription = async (title: string): Promise<string> => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate a compelling and descriptive text for a product listing with the title: "${title}".`,
        },
      ],
      model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description");
  }
};
