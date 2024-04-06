import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  content: string;
  parentId?: ObjectId;
  createdAt: Date;
  replyCount?: number;
}

export const createComment = async (
  comment: Comment,
  mongo: any
): Promise<ObjectId> => {
  try {
    const result = await mongo.Comment.insertOne(comment);
    return result.insertedId;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create comment");
  }
};

export const getCommentsByPostId = async (
  postId: string,
  page: number,
  limit: number,
  mongo: any
): Promise<Comment[]> => {
  try {
    const comments = await mongo.Comment.find({
      postId: new ObjectId(postId),
      parentId: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return comments;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get comments by post id");
  }
};

export const getCommentReplies = async (
  commentId: string,
  page: number,
  limit: number,
  mongo: any
): Promise<Comment[]> => {
  try {
    const replies = await mongo.Comment.find({
      parentId: new ObjectId(commentId),
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    return replies;
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

    // Tạo reply mới
    const replyId = await createComment(newReply, mongo);

    // Cập nhật replyCount cho comment cha
    await mongo.Comment.updateOne(
      { _id: reply.parentId },
      { $inc: { replyCount: 1 } }
    );

    return replyId;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create comment reply");
  }
};
