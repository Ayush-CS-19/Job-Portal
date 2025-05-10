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
  methods: "GET,POST,PUT",
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
