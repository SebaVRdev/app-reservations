import Agenda from "../models/Agenda.js";
import Court from "../models/Court.js";

export const getAgendas = async (req, res) => {
    try {
      const agendas = await Agenda.findAll();
      
      if( agendas.length === 0 ) {
        return res.status(401).json({message: 'No hay registros guardados en Base de Datos'});
      }
  
      return res.status(200).json({
        ok     : true,
        message: "GET - SUCCESSFUL",
        data   : agendas
      });
    } catch (error) {
      console.log({ error : error})    
    }
};

export const newAgenda = async (req, res) => {
    const { date } = req.body;
    const { idCourt } = req.params;
    
    try {
        const court = await Court.findByPk(idCourt);
        if (!court) {
            return res.status(401).json({message: 'Cancha no encontrada'});
        }
        /*const agenda = await Agenda.create({
            date
        });

        // Agregamos la cancha que se manda por parametro a la agenda recien creada con la fecha asignada
        await court.addAgenda(agenda);*/

        const dateParse = new Date(date)
        console.log(dateParse) 

        return res.status(201).json({ message : "Disponibilidad creada con exito" });
    } catch (error) {
        
    }
}