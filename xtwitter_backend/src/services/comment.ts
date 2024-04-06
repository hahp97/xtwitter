import {
  Comment,
  createComment,
  getCommentsByPostId,
} from "../repositories/comments";

export const createNewComment = async (
  comment: Comment,
  mongo: any
): Promise<any> => {
  try {
    const newComment: Comment = {
      ...comment,
    };
    return await createComment(newComment, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPostComments = async (
  postId: string,
  mongo: any
): Promise<any> => {
  try {
    return await getCommentsByPostId(postId, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
