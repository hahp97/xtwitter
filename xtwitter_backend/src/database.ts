import { Post } from "./repositories/post";
import { MongoClient } from "mongodb";
import { configEnviroment } from "./config/config";

// let db: any = null;
// let mongo: any = null;

// export const configDb = {
//   connect: async () => {
//     const { LOCAL_DB, DB_NAME } = configEnviroment;

//     if (!LOCAL_DB || !DB_NAME) {
//       throw new Error(
//         "LOCAL_DB and DB_NAME environment variables are required."
//       );
//     }
//     const client = new MongoClient(LOCAL_DB);
//     try {
//       // Connect to the MongoDB server
//       await client.connect();
//       console.log("Connected to MongoDB");
//       const db_ = client.db(DB_NAME);
//       const mongo_ = {
//         User: db_.collection("users"),
//       };
//       db = db_;
//       mongo = mongo_;

//       return { db, mongo };
//       // Do other operations with the connected database here...
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//       return {};
//     }
//   },
//   getDB: () => {
//     return { db, mongo };
//   },
// };

declare global {
  var db: any;
}

let cached: any = global.db;

if (!cached) {
  cached = global.db = { mongo: {}, db: null, client: null };
}

const connectDB = async () => {
  if (cached.db && cached.client) return cached;

  const { LOCAL_DB, DB_NAME } = configEnviroment;

  if (!LOCAL_DB || !DB_NAME) {
    throw new Error("LOCAL_DB and DB_NAME environment variables are required.");
  }

  const client = (cached.client = new MongoClient(LOCAL_DB));

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");
    const db = (cached.db = client.db(DB_NAME));
    const mongo = (cached.mongo = {
      User: db.collection("users"),
      Post: db.collection("posts"),
      Comment: db.collection("comments"),
      Like: db.collection("likes"),
    });

    return {
      db,
      mongo,
    };
    // Do other operations with the connected database here...
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return {};
  }
};

export default connectDB;
// export default configDb;
