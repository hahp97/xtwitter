import express from "express";
import { createPost, getDetailPosts } from "../services/post";
import { getPostById, getPosts } from "../repositories/post";

const router = express.Router();

// POST /api/v1/posts
router.post("/", async (req: any, res: any) => {
  try {
    const { mongo, user } = req.context || {};
    const post = req.body;

    console.log({ post: post, user: user });

    await createPost(
      { ...post, userId: user._id, userName: user.userName },
      mongo
    );

    res.status(201).json({ message: "Post created" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET /api/v1/posts
router.get("/", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};
    const posts = await getPosts(mongo);

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET /api/v1/posts/:id
router.get("/:id", async (req: any, res: any) => {
  try {
    const { mongo } = req.context || {};

    const post = await getDetailPosts(mongo, req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
