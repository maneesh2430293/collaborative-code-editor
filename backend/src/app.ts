import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", aiRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
