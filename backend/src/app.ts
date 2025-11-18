import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes";

const app = express();

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json());

// Routes
app.use("/api", aiRoutes);

// Health check (good practice)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
