import { client } from "../config/db.js";

const dbName = "moviesDB";

const saveToCollection = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });
  const users = client.db(dbName).collection("users");
  const user = await users.findOne({ token });
  if (!user) return res.status(401).json({ message: "Invalid token" });

  const item = req.body;
  if (!item) return res.status(400).json({ message: "No item provided" });

  const userCollections = client.db(dbName).collection("userCollections");
  await userCollections.updateOne(
    { userId: user._id },
    { $push: { items: item } },
    { upsert: true }
  );
  return res.json({ message: "Saved" });
};

const getCollection = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });
  const users = client.db(dbName).collection("users");
  const user = await users.findOne({ token });
  if (!user) return res.status(401).json({ message: "Invalid token" });

  const userCollections = client.db(dbName).collection("userCollections");
  const doc = await userCollections.findOne({ userId: user._id });
  return res.json({ items: doc?.items || [] });
};

export { saveToCollection, getCollection };
