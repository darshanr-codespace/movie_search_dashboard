
import { Router } from "express";
import { getTrendingMovies } from "../controllers/movieController.js";


const router = Router();

router.get("/movies", getTrendingMovies);

export default router;
