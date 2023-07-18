import Court from "../models/Court.js";

export const getCourts = async(req, res) => {
    res.send("Court - GET")
};

export const saveNewCourt = async(req, res) => {
    const { description, type  } = req.body;
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
};