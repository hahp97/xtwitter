import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId;
  content: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const createPost = async (post: Post, mongo: any): Promise<any> => {
  try {
    const result = await mongo.Post.insertOne(post);
    return result.ops[0];
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPosts = async (mongo: any): Promise<any> => {
  try {
    const posts = await mongo.Post.aggregate([
      {
        $lookup: {
          from: "Comment",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "Like",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          commentCount: { $size: "$comments" },
          likeCount: { $size: "$likes" },
        },
      },
    ]).toArray();
    return posts;
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};

export const getPostById = async (postId: string, mongo: any): Promise<any> => {
  try {
    const post = await mongo.Post.aggregate([
      { $match: { _id: new ObjectId(postId) } },
      {
        $lookup: {
          from: "Comment",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "Like",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          comments: 1,
          commentCount: { $size: "$comments" },
          likeCount: { $size: "$likes" },
        },
      },
    ]).toArray();
    return post[0];
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
