import { ObjectId } from "mongodb";

const getUserData = async (req: any, res: any, next: any) => {
  const { mongo } = req.context;
  const { id } = req.user || {};

  const user = ObjectId.isValid(id)
    ? await mongo?.User.findOne({ _id: new ObjectId(id) })
    : null;

  req.context = {
    db,
    mongo,
    user,
  };

  next();
};

export default getUserData;
