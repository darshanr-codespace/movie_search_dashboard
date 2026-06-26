import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config()

const client = new MongoClient(process.env.MONGODB_URI);

const connectDB = async () => {
  await client.connect();
  console.log("connected");
};

export default connectDB;
export { client };
  