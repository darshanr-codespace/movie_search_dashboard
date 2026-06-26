
import { Router } from "express";
import { getTrendingShows } from "../controllers/tvShowsController.js";


const router = Router();

router.get("/shows", getTrendingShows);

export default router;
