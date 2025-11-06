import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import Routes from "./routes/index";
import { errorHandler } from "./middleware/ErrorHandlers";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js app URL
    credentials: true, // allow cookies/auth if you’ll use them later
  })
);
app.use(express.json());

app.use("/api", Routes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
