import { Router } from "express";
import { getAllData } from "../controllers/allControllers.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = Router();

router.get("/all", getAllData);
router.get("/analytics", getAnalytics);

export default router;
