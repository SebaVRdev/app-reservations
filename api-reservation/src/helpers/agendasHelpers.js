import moment from 'moment';
import Agenda from "../models/Agenda.js";
import Court from "../models/Court.js";
import '../models/index.js'; // Para ir probando se debe importar para que se sepa que estan relacionados

export const newAgenda = async (idCourt, date) => {
    try {
        const court = await Court.findByPk(idCourt);
        if (!court) {
          return 'no hay cancha';
        }

        const dateMoment = moment(date).format('YYYY-MM-DD HH:mm:ss');
        const agenda = await Agenda.create({
          date : dateMoment
         });

        // Agregamos la cancha que se manda por parametro a la agenda recien creada con la fecha asignada
        const result = await court.addAgenda(agenda);
        return agenda;
    } catch (error) {
        console.log(error);
    }
}