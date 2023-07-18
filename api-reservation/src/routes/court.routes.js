import { Router } from "express";
import { getCourts, saveNewCourt } from "../controllers/court.js";

const router = Router();

router.get("/", getCourts);
router.post("/", saveNewCourt);

export default router;