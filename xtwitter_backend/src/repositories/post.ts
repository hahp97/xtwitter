import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId;
  content: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const createPost = async (post: Post, mongo: any): Promise<ObjectId> => {
  try {
    const result = await mongo.Post.insertOne(post);
    return result.insertedId;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to create post");
  }
};

export const getPosts = async (mongo: any): Promise<Post[]> => {
  try {
    const posts = await mongo.Post.find().toArray();
    return posts;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get posts");
  }
};

export const getPostById = async (
  postId: string,
  mongo: any
): Promise<Post | null> => {
  try {
    const post = await mongo.Post.findOne({ _id: new ObjectId(postId) });
    return post || null;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to get post by id");
  }
};
