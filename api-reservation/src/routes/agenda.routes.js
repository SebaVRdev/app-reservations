import { Router } from "express";
import { getAgendas, getAgendasInDate, newAgenda } from "../controllers/agenda.js";

const router = Router();

router.get("/", getAgendas);
router.get("/query/", getAgendasInDate);
router.post("/:idCourt", newAgenda);

export default router;