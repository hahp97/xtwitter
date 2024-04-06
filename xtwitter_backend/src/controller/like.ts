import express, { NextFunction } from "express";
import { NoResultReturnedError } from "../errors/noResultReturnedError";
import { addLike, removeLike } from "../services/likes";

const router = express.Router();

// POST /like/:postId
router.post("/:postId", async (req: any, res: any, next: NextFunction) => {
  const { mongo, user } = req.context;
  const { postId } = req.params;
  if (!postId || !user) {
    return next(new NoResultReturnedError("Missing required fields"));
  }
  try {
    const newLike = await addLike(postId, user._id, mongo);
    res.status(201).json(newLike);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE /like/:postId
router.delete("/:postId", async (req: any, res: any, next: NextFunction) => {
  const { mongo, user } = req.context;
  const { postId } = req.params;
  if (!postId || !user) {
    return next(new NoResultReturnedError("Missing required fields"));
  }
  try {
    await removeLike(postId, user._id, mongo);
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
