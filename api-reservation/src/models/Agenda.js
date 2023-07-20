import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

const Agenda = sequelize.define('Agenda',
    {
    // Definir las columnas de la tabla
    idAgenda : {
        type         : DataTypes.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
    },
    date : {
        type : DataTypes.STRING
    },
    status : {
        type : DataTypes.STRING, // 'disponible', 'reservada', 'mantenimiento'
        defaultValue : "disponible"
    }, 
      // ...
    },
    {
      // Opciones adicionales del modelo
      // ...
      timestamps: false
    }
);

// Una cancha puede tener muchas agendas 

export default Agenda