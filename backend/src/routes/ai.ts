import { Router } from "express";
import { generateDescriptionController } from "../controllers/aiController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/generate-description", protect, generateDescriptionController);

export default router;
