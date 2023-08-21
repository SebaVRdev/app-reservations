import { Op, Sequelize } from "sequelize";
import moment from "moment";

import Agenda from "../models/Agenda.js";
import Court from "../models/Court.js";

export const getAgendas = async (req, res) => {
    try {
      const agendas = await Agenda.findAll();
      /* const agendas = await Agenda.findAll({
        where : {
          [Op.like]: `July%`
        }
      }); */
      
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

export const getAgendasInfo = async (req, res) => {
  const agenda = await Agenda.findAll({
    attributes: ['idAgenda', 'status', 'date'],
    include: [
      {
        model: Court,
        attributes: ['type'],
        where: {
          idCourt: Sequelize.col('Agenda.idCourt'),
        },
      },
    ],
  });

  return res.status(200).json({
    ok     : true,
    message: "GET - SUCCESSFUL",
    data   : agenda
  });
}

export const getAgendasInDate = async (req, res) => {
    const { date, slug } = req.query;
    try {
      const dateMoment = moment(date).format('YYYY-MM-DD');
      console.log(dateMoment);
      const agendas = await Agenda.findAll({
        attributes: ['idAgenda', 'status', 'date'],
        include: [
          {
            model: Court,
            attributes: ['type'],
            where: {
              idCourt: Sequelize.col('Agenda.idCourt'), // Ajusta la relación según tus modelos
            },
          },
        ],
        where: {
          date: {
            [Sequelize.Op.like]: `${dateMoment}%`,
          },
        },
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
      /*La siguiente validacion se podria eliminar ya que existe un middleware 
      que se va a ejecutar antes que este controlador, que va a verificar si esta disponible la 
      cancha para respectiva fecha
      */
      const court = await Court.findByPk(idCourt);
      if (!court) {
          return res.status(401).json({message: 'Cancha no encontrada'});
      }

      const dateMoment = moment(date).format('YYYY-MM-DD HH:mm:ss');
      const agenda = await Agenda.create({
          date : dateMoment
      });
        
        // Agregamos la cancha que se manda por parametro a la agenda recien creada con la fecha asignada
        await court.addAgenda(agenda);

        return res.status(201).json({ 
            message : "Disponibilidad creada con exito", 
            dateMoment : dateMoment
          }
        );
    } catch (error) {
      return res.status(500).json({ message : "Error inesperado en el servidor" })
    }
}