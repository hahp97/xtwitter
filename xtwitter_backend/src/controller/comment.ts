import express from "express";
import { addComment } from "../repositories/post";

const router = express.Router();

// POST /api/v1/comments
router.post("/", async (req: any, res: any) => {
  try {
    const { mongo, user } = req.context || {};
    const comment = req.body;

    await addComment(
      req.body.postId, // check
      { ...comment },
      mongo
    );

    res.status(201).json({ message: "Comment created" });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
