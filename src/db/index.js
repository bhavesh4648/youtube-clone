import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const mongoConnection = (async () => {
  try {
    const mongoConnection = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      "MongoDB Connected Successfully",
      mongoConnection.connections.port
    );
  } catch (error) {
    console.log("MongoDB error :", error);
    process.exit(1);
  }
})();

// const mongoConnection = async () => {
//   try {
//     const connection = await mongoose.connect(
//       `${process.env.MONGO_URL}/${DB_NAME}`
//     );

//     console.log("MongoDB connected Successfullly");
//   } catch (error) {
//     console.log("mongoDB connection Error :", error);
//
//     // throw error;
//   }
// };

export default mongoConnection;
