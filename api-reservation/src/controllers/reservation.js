import Reservation from "../models/Reservation.js";

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    
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