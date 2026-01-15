import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS OPTIONS (VERY IMPORTANT)
const corsOptions = {
  origin: "https://mernnauthh.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Handle preflight requests
app.options("*", cors(corsOptions));

// ✅ Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port ${PORT}`);
});
