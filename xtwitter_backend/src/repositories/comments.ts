export const getCommentsByPostId = async (postId: string, mongo: any) => {
  try {
    return await mongo.Comment.find({ postId }).toArray();
  } catch (error) {
    console.log({ error });
    throw new Error("500");
  }
};
