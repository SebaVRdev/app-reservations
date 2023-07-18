import Reservation from "./Reservation.js";
import Court from "./Court.js";
import Agenda from "./Agenda.js";


// Asociaciones necesarias para el funcionamiento

/* Una cancha estara en muchas agendas, crea un Idcourt en Agenda */ 
// 1 -> N
Court.hasMany(Agenda, {
    foreignKey: 'idCourt'
});
Agenda.belongsTo(Court,{
    foreignKey: 'idCourt'
});

/* Una reserva pertenece a una agenda, en esta se detalla mejor el precio de la cancha */
// 1 -> 1
Agenda.hasOne(Reservation, {
    foreignKey: 'idAgenda'
});
Reservation.belongsTo(Agenda, {
    foreignKey: 'idAgenda'
});