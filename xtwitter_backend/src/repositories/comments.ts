import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  content: string;
  createdAt: Date;
}

export const createComment = async (
  comment: Comment,
  mongo: any
): Promise<any> => {
  try {
    const result = await mongo.Comment.insertOne(comment);
    return result.ops[0];
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getCommentsByPostId = async (
  postId: string,
  mongo: any
): Promise<any> => {
  try {
    const comments = await mongo.Comment.find({
      postId: new ObjectId(postId),
    }).toArray();
    return comments;
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
