import { Router } from "express";
import { getCourtById, getCourts, saveNewCourt, updateCourt } from "../controllers/court.js";

const router = Router();

router.get("/", getCourts);
router.get("/:courtId", getCourtById);
router.post("/", saveNewCourt);
router.put("/:courtId", updateCourt);

export default router;