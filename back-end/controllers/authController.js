import { client } from "../config/db.js";
import crypto from "crypto";

const dbName = "moviesDB";

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  const users = client.db(dbName).collection("users");
  const exists = await users.findOne({ email });
  if (exists) return res.status(409).json({ message: "User already exists" });
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const token = crypto.randomBytes(24).toString("hex");
  const result = await users.insertOne({ email, password: hash, token });
  return res.status(201).json({ message: "User created", token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  const users = client.db(dbName).collection("users");
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await users.findOne({ email, password: hash });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  // issue a fresh token
  const token = crypto.randomBytes(24).toString("hex");
  await users.updateOne({ _id: user._id }, { $set: { token } });
  return res.json({ message: "Logged in", token });
};

export { signup, login };
