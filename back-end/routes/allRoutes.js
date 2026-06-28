import { Router } from "express";
import { getAllData,getDetails} from "../controllers/allControllers.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = Router();

router.get("/all", getAllData);
router.get("/analytics", getAnalytics);
router.get("/search/:id", getDetails);

export default router;
