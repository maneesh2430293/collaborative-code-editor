import { Router } from "express";
import { getCodeCompletion } from "../controllers/ai.controller";

const router = Router();

router.post("/complete", getCodeCompletion);

export default router;
