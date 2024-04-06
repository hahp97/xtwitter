import express, { NextFunction } from "express";
import { NoResultReturnedError } from "../errors/noResultReturnedError";

import { ObjectId } from "mongodb";
import {
  createCommentReply,
  getCommentReplies,
} from "../repositories/comments";
import { createNewComment, getPostComments } from "../services/comment";

const router = express.Router();

router.post("/", async (req: any, res: any, next: NextFunction) => {
  const { mongo, user } = req.context;
  const { postId, content, parentId } = req.body;
  if (!postId || !user || !content) {
    return next(new NoResultReturnedError("Missing required fields"));
  }
  try {
    await createNewComment(
      {
        postId: new ObjectId(postId),
        userId: user._id,
        content,
        parentId: parentId ? new ObjectId(parentId) : undefined,
        createdAt: new Date(),
      },
      mongo
    );
    res.status(201).json({ message: "Comment created successfully", content });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/post/:postId", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const postId = req.params.postId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const comments = await getPostComments(postId, page, limit, mongo);
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:commentId/replies", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const commentId = req.params.commentId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const replies = await getCommentReplies(commentId, page, limit, mongo);
    res.status(200).json(replies);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post(
  "/:commentId/replies",
  async (req: any, res: any, next: NextFunction) => {
    const { mongo, user } = req.context;
    const { content } = req.body;
    const commentId = req.params.commentId;

    if (!content || !user) {
      return next(new NoResultReturnedError("Missing required fields"));
    }

    try {
      const parentComment = await mongo.Comment.findOne({
        _id: new ObjectId(commentId),
      });

      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment not found" });
      }

      const replyId = await createCommentReply(
        {
          postId: parentComment.postId,
          userId: user._id,
          content,
          parentId: new ObjectId(commentId),
          createdAt: new Date(),
        },
        mongo
      );
      res.status(201).json({ message: "Reply created successfully", replyId });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
