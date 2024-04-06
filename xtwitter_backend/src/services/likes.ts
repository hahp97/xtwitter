import { ObjectId } from "mongodb";
import {
  Like,
  createLike,
  deleteLike,
  getLikesByPostId,
} from "../repositories/likes";

export const addLike = async (
  postId: string,
  userId: string,
  mongo: any
): Promise<any> => {
  try {
    const newLike: Like = {
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
      createdAt: new Date(),
    };
    return await createLike(newLike, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const removeLike = async (
  postId: string,
  userId: string,
  mongo: any
): Promise<any> => {
  try {
    return await deleteLike(postId, userId, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPostLikes = async (
  postId: string,
  mongo: any
): Promise<any> => {
  try {
    return await getLikesByPostId(postId, mongo);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
