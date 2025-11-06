import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js app URL
    credentials: true, // allow cookies/auth if you’ll use them later
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
