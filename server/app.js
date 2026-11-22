
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import connectDB from "./config/db.js";
const app = express();
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database request failed:", error.message);

    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
};


// Middleware
app.use(
  cors({
    origin: [
  "http://localhost:5173",
   "https://leadflow-frontend-blush.vercel.app",
],
credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", ensureDB, authRoutes);

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LeadFlow API is running successfully",
  });
});

app.use("/api/leads", ensureDB, leadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});


app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message || "Internal Server Error",
  });
});


export default app;
