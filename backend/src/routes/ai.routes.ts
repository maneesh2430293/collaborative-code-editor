import { Router } from "express";
import { getCodeCompletion } from "../controllers/ai.controller";

const router = Router();

// POST /api/complete
router.post("/complete", getCodeCompletion);

export default router;
