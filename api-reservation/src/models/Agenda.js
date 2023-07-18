import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

const Agenda = sequelize.define('Agenda',
    {
    // Definir las columnas de la tabla
    id : {
        type         : DataTypes.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
    },
    date : {
        type : DataTypes.DATE
        },
    status : {
        type : DataTypes.STRING // 'disponible', 'reservada', 'mantenimiento'
    }, 
      // ...
    },
    {
      // Opciones adicionales del modelo
      // ...
      timestamps: false
    }
);

export default Agenda