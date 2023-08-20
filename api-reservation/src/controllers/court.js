import Court from "../models/Court.js";

export const getCourts = async(req, res) => {
    try {
        const courts = await Court.findAll();
        if (courts.length === 0) {
            return res.status(404).json({
                message: "No se encontraron canchas en BD"
            })
        }

        return res.status(200).json({
            ok      : true,
            message : "Canchas",
            data    : courts 
        })
    } catch (error) {
        return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
};
export const getCourtById = async(req, res) => {
    const { courtId } = req.params;
    try {
        const court = await Court.findByPk(courtId);
        if (!court) {
            return res.status(404).json({
                message: "No se encontraron canchas en BD con ese ID"
            })
        }

        return res.status(200).json({
            ok      : true,
            message : "Cancha encontrada",
            data    : court 
        })
    } catch (error) {
        return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
};

export const saveNewCourt = async(req, res) => {
    const { description, type  } = req.body;
    try {
        const newCourt = await Court.create({
            description,
            type
        })
    
        if (!newCourt) {
            return res.status(500).json({
                message: "No se pudo crear la cancha de forma exitosa"
            })
        }
    
        return res.status(201).json({
            ok : true,
            newCourt 
        });
    } catch (error) {
        return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
};

export const updateCourt = async(req, res) => {
    const body = req.body;
    const { courtId } = req.params;
    try {
        const court = await Court.findByPk(courtId);

        if (!court) {
            return res.status(404).json({
                message: "No se encontro cancha con ese id"
            })
        }

        await court.update(body);
        return res.status(201).json({
            ok : true        });
    } catch (error) {
        return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
};

