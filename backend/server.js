import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import labtechnician from "./routes/labtechnician.js";
import labmanagerRoutes from "./routes/labmanagerRoutes.js";
import superadminRoutes from "./routes/superadminRoutes.js";
import pathologistRoutes from "./routes/pathologistRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

// middlewares
app.use(express.json());
const isProduction = process.env.NODE_ENV === 'production';

// Dynamic CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || !isProduction) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(cookieParser());

// Mount the separate backend routes under specific paths
app.use('/api/auth', authRoutes);
app.use('/api/labtechnician', labtechnician);
app.use('/api/labmanager', labmanagerRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/pathologist', pathologistRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Unified MedFlow API gateway is operational and healthy",
    
  });
});
 
// JSON parsing error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON payload.",
      error: err.message,
    });
  }
  console.error("Unhandled Error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
