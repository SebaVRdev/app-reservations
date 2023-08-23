import cron from 'node-cron';
import moment from 'moment';
import Agenda from '../models/Agenda.js';
import sequelize from '../db/database.js';
import Court from '../models/Court.js';
import { newAgenda } from '../helpers/agendasHelpers.js';

const availableHours = [
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
    '21:00:00',
    '22:00:00',
];

async function lastDateInRegister (){
    const result = await Agenda.findOne({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('date')), 'maxDate']
        ]
    });
    const lastDate = result.dataValues.maxDate;
    return lastDate;
};

async function getCourtsInfo(){
  const results = await Court.findAll();
  const data = await JSON.parse(JSON.stringify(results));
  return data;
}


async function crearNuevoRegistro() {
    const beforeDate = await lastDateInRegister();
    const actualDate = moment().format('YYYY-MM-DD');
    const updateDate = moment(beforeDate).add(1, 'days').format('YYYY-MM-DD');
    const data = await getCourtsInfo(); 
    data.map(async (court) => {
      console.log(court)
      for (let index = 0; index < availableHours.length; index++) {
        let dateSave = `${updateDate} ${availableHours[index]}`
        await newAgenda(court.idCourt, dateSave);
      }  
    });
}
  
  // Configura la tarea programada para ejecutarse todos los días a la medianoche
cron.schedule('0 0 * * *', () => {
  console.log('Se agragaran datos para la nueva fecha');
  crearNuevoRegistro();
}); 
crearNuevoRegistro();