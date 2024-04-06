import express, { NextFunction } from "express";
import { NoResultReturnedError } from "../errors/noResultReturnedError";
import { createNewComment } from "../services/comment";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req: any, res: any, next: NextFunction) => {
  const { mongo, user } = req.context;
  const { postId, content } = req.body;
  if (!postId || !user || !content) {
    return next(new NoResultReturnedError("Missing required fields"));
  }
  try {
    const newComment = await createNewComment(
      {
        postId: new ObjectId(postId),
        userId: user._id,
        content,
        createdAt: new Date(),
      },
      mongo
    );
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
