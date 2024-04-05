import { ObjectId } from "mongodb";

const getUserData = async (req: any, res: any, next: any) => {
  const { mongo } = req.context;
  const { id } = req.context.user || {};
  const user = ObjectId.isValid(id)
    ? await mongo?.User.findOne({ _id: new ObjectId(id) })
    : null;
  req.context.user = user;
  next();
};

export default getUserData;
