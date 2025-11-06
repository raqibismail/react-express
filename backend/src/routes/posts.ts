import e from "express";
import prisma from "../prisma/client";

const router = e.Router();

// router.get("/", async (req, res) => {
//   try {
//     const posts = await prisma.post.findMany({
//       include: { user: true },
//     });
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch posts" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;
