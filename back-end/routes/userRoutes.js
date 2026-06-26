import { Router } from "express";
import { saveToCollection, getCollection } from "../controllers/userController.js";

const router = Router();

router.post("/collection", saveToCollection);
router.get("/collection", getCollection);

export default router;
