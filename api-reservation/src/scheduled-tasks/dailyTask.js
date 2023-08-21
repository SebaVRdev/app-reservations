import cron from 'node-cron';
import Agenda from '../models/Agenda.js';
import sequelize from '../db/database.js';

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
}


async function crearNuevoRegistro() {
    const beforeDate = await lastDateInRegister();
    //const [date, _] = beforeDate.split(' ');
    const date = beforeDate.split(' ')[0];
    console.log(date);
    
    /* TuModelo.create({
      // Propiedades del nuevo registro
    })
      .then(() => {
        console.log('Nuevo registro creado automáticamente.');
      })
      .catch(error => {
        console.error('Error al crear el registro:', error);
      });
   */
}
  
  // Configura la tarea programada para ejecutarse todos los días a la medianoche
cron.schedule('0 0 * * *', () => {
  console.log('Entro');
  crearNuevoRegistro();
}); 
crearNuevoRegistro();