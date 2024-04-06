import { ObjectId } from "mongodb";
import {
  Comment,
  createComment,
  getCommentsByPostId,
} from "../repositories/comments";

export const createNewComment = async (
  comment: Comment,
  mongo: any
): Promise<ObjectId> => {
  try {
    const newComment: Comment = {
      ...comment,
      createdAt: new Date(),
    };
    return await createComment(newComment, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create comment");
  }
};

export const getPostComments = async (
  postId: string,
  page: number,
  limit: number,
  mongo: any
): Promise<Comment[]> => {
  try {
    return await getCommentsByPostId(postId, page, limit, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get post comments");
  }
};

export const getCommentReplies = async (
  commentId: string,
  page: number,
  limit: number,
  mongo: any
): Promise<Comment[]> => {
  try {
    return await getCommentReplies(commentId, page, limit, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get comment replies");
  }
};

export const createCommentReply = async (
  reply: Comment,
  mongo: any
): Promise<ObjectId> => {
  try {
    const newReply: Comment = {
      ...reply,
      createdAt: new Date(),
      replyCount: 0,
    };
    return await createCommentReply(newReply, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create comment reply");
  }
};
