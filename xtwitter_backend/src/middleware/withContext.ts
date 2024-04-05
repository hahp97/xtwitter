import { ObjectId } from "mongodb";

export const withContext = async ({
  mongo,
  req,
  res,
}: {
  mongo: any;
  req: any;
  res: any;
}) => {
  async (req: any, res: any, next: any) => {
    const userId = req.userId;
    const user = ObjectId.isValid(userId)
      ? await mongo?.User.findOne({ _id: new ObjectId(userId) })
      : null;

    req.context = {
      db,
      mongo,
      user,
    };
    next();
  };
};
