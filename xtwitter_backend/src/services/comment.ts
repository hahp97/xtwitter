import { ObjectId } from "mongodb";
import { createComment } from "../repositories/comments";
import { getPostById } from "../repositories/post";

export const addComment = async (
  {
    comment,
    postId,
    userId,
  }: { comment: string; postId: string; userId: string },
  mongo: any
) => {
  const post = await getPostById(postId, mongo);

  if (!post) {
    throw new Error("404");
  }

  try {
    return await createComment({ comment, postId, userId }, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
