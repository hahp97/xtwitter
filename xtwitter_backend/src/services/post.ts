import { Post, createPost, getPostById, getPosts } from "../repositories/post";

export const createNewPost = async (post: Post, mongo: any): Promise<any> => {
  try {
    const newPost: Post = {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await createPost(newPost, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getAllPosts = async (mongo: any): Promise<any> => {
  try {
    return await getPosts(mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPostDetails = async (
  postId: string,
  mongo: any
): Promise<any> => {
  try {
    return await getPostById(postId, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
