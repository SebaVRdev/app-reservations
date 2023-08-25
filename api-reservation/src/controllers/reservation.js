import moment from "moment";
import Reservation from "../models/Reservation.js";
import Agenda from "../models/Agenda.js";
import Court from "../models/Court.js";

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      attributes: ['nameUser', 'priceTotal'],
      include: [
        {
          model: Agenda,
          attributes: ['date', 'status'],
          include: [
            {
              model: Court,
              attributes: ['slug']
            }
          ]
        }
      ]
    })
    
    if( reservations.length === 0 ) {
      return res.status(401).json({message: 'No hay registros guardados en Base de Datos'});
    }

    return res.status(200).json({
      ok     : true,
      message: "GET - SUCCESSFUL",
      data   : reservations
    });
  } catch (error) {
    console.log({ error : error})    
  }
};

export const getReservationsById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      attributes: ['nameUser', 'priceTotal'],
      include: [
        {
          model: Agenda,
          attributes: ['date', 'status'],
          include: [
            {
              model: Court,
              attributes: ['slug']
            }
          ]
        }
      ]
    })
    
    if( reservations.length === 0 ) {
      return res.status(401).json({message: 'No hay registros guardados en Base de Datos'});
    }

    return res.status(200).json({
      ok     : true,
      message: "GET - SUCCESSFUL",
      data   : reservations
    });
  } catch (error) {
    console.log({ error : error})    
  }
};

export const setReservation = async (req, res) => {
  const agenda = req.agenda;
  const {  name, email, price } = req.body;
  try {
    console.log({
      name,price,email
    });
    console.log(agenda.idAgenda)
    const reservation = await Reservation.create({
      nameUser: name,
      emailUser: email,
      priceTotal:price,
      idAgenda: agenda.idAgenda
    });  

    // Si todo sale bien, cambiamos el estado de la agenda ya que fue reservada
    agenda.status = "ocupado";
    agenda.save();
    return res.status(200).json({
      ok     : true,
      message: "GET - SUCCESSFUL",
      data   : {}
    });
  } catch (error) {
    console.log({ error : error})    
  }
};