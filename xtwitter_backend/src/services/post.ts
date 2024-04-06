import { ObjectId } from "mongodb";
import { Post, createPost, getPostById, getPosts } from "../repositories/post";

export const createNewPost = async (
  post: Post,
  mongo: any
): Promise<ObjectId> => {
  try {
    const newPost: Post = {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await createPost(newPost, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create post");
  }
};

export const getAllPosts = async (mongo: any): Promise<Post[]> => {
  try {
    return await getPosts(mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get posts");
  }
};

export const getPostDetails = async (
  postId: string,
  mongo: any
): Promise<Post | null> => {
  try {
    return await getPostById(postId, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get post details");
  }
};
