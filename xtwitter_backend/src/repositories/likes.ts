import { ObjectId } from "mongodb";

export interface Like {
  _id?: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  createdAt: Date;
}

export const createLike = async (like: Like, mongo: any): Promise<any> => {
  try {
    const result = await mongo.Like.insertOne(like);
    return result.ops[0];
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const deleteLike = async (
  postId: string,
  userId: string,
  mongo: any
): Promise<any> => {
  try {
    const result = await mongo.Like.deleteOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
    });
    return result.deletedCount;
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getLikesByPostId = async (
  postId: string,
  mongo: any
): Promise<any> => {
  try {
    const likes = await mongo.Like.find({
      postId: new ObjectId(postId),
    }).toArray();
    return likes;
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
