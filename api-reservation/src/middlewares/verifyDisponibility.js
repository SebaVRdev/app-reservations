import Agenda from "../models/Agenda.js";

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
    
        if (existAgenda) {
            console.log("Se puede reservar");
            next();
        }
        
        return res.status(409).json({ error: 'La fecha ya está reservada.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
}