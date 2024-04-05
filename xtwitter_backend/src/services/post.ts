import { getCommentsByPostId } from "../repositories/comments";
import { createNewPost, getPostById, getPosts } from "../repositories/post";

export const createPost = async (post: any, mongo: any): Promise<any> => {
  try {
    return await createNewPost(
      {
        ...post,
        createdAt: new Date(),
        updatedAt: null,
      },
      mongo
    );
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getDetailPosts = async (
  mongo: any,
  postId: string
): Promise<any> => {
  try {
    const comments = await getCommentsByPostId(postId, mongo);
    const post = await getPostById(postId, mongo);

    return {
      post: {
        ...post,
        comments: comments,
      },
    };
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
