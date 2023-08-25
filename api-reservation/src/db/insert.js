// Script para llenar base de datos
import sequelize from './database.js';
import Agenda from '../models/Agenda.js';
import Court from '../models/Court.js';
import Reservation from '../models/Reservation.js';
import '../models/index.js';

// Canchas
const courts = [
    {
        description: "Padel Agu",
        type       : "Padel"
    },
    {
        description: "Padel Trini",
        type       : "Padel"
    },
    {
        description: "Futbol Seba",
        type       : "Futbol"
    },
]
  
  //Players
const agendas = [
    {
      date : "2023-07-20 15:30:00",
      price: 20000
    },
    {
      date : "2023-07-20 17:00:00",
      price: 15000
    },
    {
      date : "2023-07-22 15:30:00",
      price: 20000
    },
    {
      date : "2023-07-22 17:30:00",
      price: 20000
    },
];  

sequelize.sync({force: true}).then(() => {
    console.log("Conexion estanlecida");
})
.then(async () => {
    for (const court of courts) {
        await Court.create(court)
    }
})
.then( async () => {
    console.log("Se hizo todo bien")
    const courts = await Court.findAll();
    const idsOfCourts = courts.map( court => court.idCourt )
    agendas.forEach( async function callback(agenda, index, array) {
        //Creo la agenda
        const agendaCreateBD = await Agenda.create({
            date : agenda.date,
            price: agenda.price
        });
        const idCourt = idsOfCourts[Math.floor(Math.random() * idsOfCourts.length)]; 
        // Court en base al id
        const court = await Court.findByPk(idCourt);
        await court.addAgenda(agendaCreateBD);
    }); 
})