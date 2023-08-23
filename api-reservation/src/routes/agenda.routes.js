import { Router } from "express";
import { getAgendas, getAgendasInDate, getAgendasInfo, newAgendaSave } from "../controllers/agenda.js";
import { verifyCourt, verifyDisponibility } from "../middlewares/verifyDisponibility.js";

const router = Router();

router.get("/", getAgendas);
router.get("/info", getAgendasInfo);
router.get("/query/", getAgendasInDate);
router.post("/:idCourt", [verifyCourt] , newAgendaSave);

export default router;