import Agenda from "../models/Agenda.js";
import Court from "../models/Court.js";

export const verifyDisponibility = async ( req, res, next ) => {
    const { date } = req.body;
    const { idCourt } = req.params;
    try {
        const existAgenda = await Agenda.findOne({
            where: {
                idCourt,
                date,
                status: 'disponible'
            },
        });
        
        if (!existAgenda) {
            console.log("Fallo en MDL no pasa al controller");
            return res.status(409).json({ error: 'La fecha ya está reservada.' });
        }
        console.log("Se puede reservar");
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
}
export const verifyCourt = async ( req, res, next ) => {
    const { idCourt } = req.params;
    try {
        const existCourt = await Court.findByPk(idCourt);
        if (!existCourt) {
            console.log("Fallo en MDL no pasa al controller");
            return res.status(409).json({ error: 'La cancha no esta disponible.' });
        }

        // Adjuntar el objeto existCourt al objeto req para que esté disponible en el controlador
        req.court = existCourt;

        console.log("Se puede reservar");
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
}