import express, { NextFunction } from "express";
import { NoResultReturnedError } from "../errors/noResultReturnedError";
import { createNewPost, getAllPosts, getPostDetails } from "../services/post";
const router = express.Router();

router.post("/", async (req: any, res: any, next: NextFunction) => {
  const { mongo, user } = req.context;
  const post = req.body;
  if (!post || !user) {
    return next(new NoResultReturnedError("Missing required fields"));
  }
  try {
    await createNewPost({ ...post, userId: user._id }, mongo);
    res.status(201).json({ message: "Post created", ...post });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const posts = await getAllPosts(mongo);
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const post = await getPostDetails(req.params.id, mongo);
    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
