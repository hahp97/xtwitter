import express, { NextFunction } from "express";
import { NoResultReturnedError } from "../errors/noResultReturnedError";
import { addComment } from "../services/comment";
import { ObjectId } from "mongodb";

const router = express.Router();

// POST /api/v1/posts/:postId/comments
router.post(
  "/:postId/comments",
  async (req: any, res: any, next: NextFunction) => {
    const { mongo, user } = req.context || {};
    const comment = req.body;
    const { postId } = req.params;

    if (!postId || !user || !comment) {
      return next(new NoResultReturnedError("Missing required fields"));
    }
    try {
      await addComment({ ...comment, postId, userId: user._id }, mongo);

      res.status(201).json({
        message: "Comment created",
        data: {
          comment: comment.comment,
          postId: new ObjectId(postId),
          userId: user._id,
        },
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

export default router;
