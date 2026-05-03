import { Request, Response } from "express";
import { generateDescription } from "../services/aiService";

export const generateDescriptionController = async (
  req: Request,
  res: Response
) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const description = await generateDescription(title);
    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate description" });
  }
};
