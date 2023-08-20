import { Op } from "sequelize";
import moment from "moment";

import Agenda from "../models/Agenda.js";
import Court from "../models/Court.js";

export const getAgendas = async (req, res) => {
    try {
      const agendas = await Agenda.findAll({
        where : {
          [Op.like]: `July%`
        }
      });
      
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
      return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
};

export const getAgendasInDate = async (req, res) => {
    const { date, slug } = req.query;
    try {
      const dateMoment = moment(date).format('MMMM Do YYYY, h:mm:ss a');
      console.log(dateMoment)
      const whereClause = {
        //date: date,
        [Op.like]: `2023-07-20%`
      };
  
      // Verificar si el slug está presente en la consulta
      if (slug) {
        whereClause['$Court.slug$'] = slug;
      }

      const agendas = await Agenda.findAll({
        attributes : ["idAgenda", "date","status"], 
        where : whereClause,
        include: [
          {
            model : Court
          }
        ]
      });
      
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
      return res.status(500).json({ message : "Error inesperado en el servidor" })
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

        const dateMoment = moment(date).format('MMMM Do YYYY, h:mm:ss a');;
        console.log({dateMoment : dateMoment}); 

        const agenda = await Agenda.create({
            date : dateMoment
        });
        
        // Agregamos la cancha que se manda por parametro a la agenda recien creada con la fecha asignada
        await court.addAgenda(agenda);

        return res.status(201).json({ 
          message : "Disponibilidad creada con exito", 
          dateMoment : dateMoment});
    } catch (error) {
      return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
}