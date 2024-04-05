import { ObjectId } from "mongodb";

export interface Post {
  content: string;
  _id?: string;
  userId: string;
}

export interface Comment {
  content: string;
  userId: string;
  userName: string;
}

export const createNewPost = async (post: Post, mongo: any): Promise<any> => {
  try {
    return await mongo.Post.insertOne(post);
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPosts = async (mongo: any): Promise<any> => {
  try {
    return await mongo.Post.find().toArray();
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPostById = async (id: string, mongo: any): Promise<any> => {
  try {
    return await mongo.Post.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const addComment = async (
  postId: string,
  comment: Comment,
  mongo: any
) => {
  try {
    return await mongo.Comment.insertOne({ ...comment, postId });
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
