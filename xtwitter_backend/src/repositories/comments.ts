import { ObjectId } from "mongodb";

export const getCommentsByPostId = async (postId: string, mongo: any) => {
  try {
    return await mongo.Comment.find({ postId }).toArray();
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const createComment = async (
  comment: { comment: string; postId: string; userId: string },
  mongo: any
) => {
  try {
    return await mongo.Comment.insertOne({
      ...comment,
      postId: new ObjectId(comment.postId),
    });
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
