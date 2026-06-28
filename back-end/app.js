import express from "express";
import connectDB from "./config/db.js";
import movieRouter from "./routes/movieRoutes.js";
import tvShowsRouter from "./routes/tvShowsRoutes.js";
import allInfoRouter from "./routes/allRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
await connectDB();

app.use("/api/trending/", movieRouter);
app.use("/api/trending/", tvShowsRouter);
app.use("/api/", allInfoRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
