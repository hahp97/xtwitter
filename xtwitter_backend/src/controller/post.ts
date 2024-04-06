import express, { NextFunction } from "express";
import { NoResultReturnedError } from "../errors/noResultReturnedError";
import { createNewPost, getAllPosts, getPostDetails } from "../services/post";

const router = express.Router();

// POST /post
router.post("/", async (req: any, res: any, next: NextFunction) => {
  const { mongo, user } = req.context;
  const post = req.body;
  if (!post || !user) {
    return next(new NoResultReturnedError("Missing required fields"));
  }
  try {
    const newPost = await createNewPost({ ...post, userId: user._id }, mongo);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET /post
router.get("/", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const posts = await getAllPosts(mongo);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET /post/:id
router.get("/:id", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const post = await getPostDetails(req.params.id, mongo);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
