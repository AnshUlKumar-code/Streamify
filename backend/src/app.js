import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./config/DBconfig.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoute.js";
import { chatRouter } from "./routes/chatRoute.js";
import cors from "cors";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from parent directory (Streamify folder)
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

// Production static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,  "../../frontend/dist")));

  // Use regex pattern for catch-all
  app.get(/^\/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});