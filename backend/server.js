import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS for Local + Netlify
app.use(
  cors({
    origin: [
      "http://localhost:5173",        // local development
      "https://authmernn.netlify.app" // production (Netlify)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening at port ${PORT}`);
});
