import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SIMPLE & SAFE CORS (Render + Netlify)
app.use(cors({
  origin: "https://authmernn.netlify.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening at port ${PORT}`);
});
