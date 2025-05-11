import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
};
app.use(cors(corsOptions));

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/company", companyRoute);
    app.use("/api/v1/job", jobRoute);
    app.use("/api/v1/application", applicationRoute);

    app.use((err, req, res, next) => {
      console.error(`Error in ${req.method} ${req.url}:`, err.stack);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    });

    // Start the server with app.listen
    const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

startServer();
